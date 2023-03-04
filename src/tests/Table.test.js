import Table from "../components/Table/Table";
import { act, render, screen, waitFor } from "@testing-library/react";
import App from "../App";

describe("Testa o component Table", () => {
  test("verifica se a tabela é renderizada corretamente", async () => {
    render(<Table />);
    await waitFor(() => {
      expect(screen.getByRole("table")).toBeInTheDocument();
      
    });
  });
  // test('', async() => {
  //   act(() => {
  //     render(<App />);
  //   })
  //   await waitFor(() => {
      
  //     expect(screen.findAllByRole('row')).toHaveLength(11);      
  //   });
  // })
  
});
