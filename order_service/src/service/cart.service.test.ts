import { CartRepositoryType } from "../types/repository.types";
import * as repository from "../repository/cart.repository";
import * as service from "../service/cart.service";

describe("Cart Service", () => {
  let repo: CartRepositoryType;

  beforeEach(() => {
    repo = repository.CartRepository;
  });

  afterEach(() => {
    repo = {} as CartRepositoryType;
  });

  it("should create a cart successfully", async () => {
    const mockCart = {
      title: "Smart Phone",
      amount: 1000,
    };

    jest.spyOn(repository.CartRepository, "create").mockImplementationOnce(() =>
      Promise.resolve({
        message: "fake response from cart repository",
        input: mockCart,
      })
    );

    const res = await service.CreateCart(mockCart, repo);

    expect(res).toEqual({
      message: "fake response from cart repository",
      input: mockCart,
    });
  });
});
