import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { mockData } from "../helpers/mockData";

describe("Testa o componente que renderiza o nome dos filtros", () => {
  beforeEach(async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(mockData),
    }));
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test("Verifica se ao clicar em um filtro seu valor é renderizado na tela", () => {
    render(<App />);
    expect(screen.getByTestId("button-filter")).toBeInTheDocument();
    userEvent.click(screen.getByTestId("button-filter"));
    expect(screen.getByText(/population maior que 0/i)).toBeInTheDocument();
  });
  test("Verifica se ao clicar em mais de um filtro os valores corretos renderizam", () => {
    render(<App />);
    expect(screen.getByTestId("button-filter")).toBeInTheDocument();
    userEvent.click(screen.getByTestId("button-filter"));
    expect(screen.getByText(/population maior que 0/i)).toBeInTheDocument();
  });
  test("Verifica se filtra por nome", async () => {
    render(<App />);
    userEvent.type(screen.getByTestId("name-filter"), "a");
    userEvent.click(screen.getByTestId("button-filter"));
  });
  test("Verifica se filtra por comparação numérica", async () => {    
      render(<App />)    
    userEvent.type(screen.getByTestId("value-filter"), 3000);
    userEvent.selectOptions(screen.getByTestId("column-filter"), "population");
    userEvent.selectOptions( screen.getByTestId("comparison-filter"),"menor que" );
    userEvent.click(screen.getByTestId("button-filter"));
    // await waitFor(() => {
    //   const planets = screen.getAllByTestId('planet-name')
    //   expect(planets).toHaveLength(1);
    // })
  });
  test("Verifica os filtros de ordenação", async () => {    
      render(<App />);

    const sortSelect = await screen.findByTestId("column-sort");
    const ascButton = await screen.findByTestId("column-sort-input-asc");
    const descButton = await screen.findByTestId("column-sort-input-desc");
    const orderButton = await screen.findByTestId("column-sort-button");
    const planets = await screen.findAllByTestId("planet-name");
    expect(planets).toHaveLength(10)

    userEvent.selectOptions(sortSelect, "population");
    userEvent.click(descButton);
    userEvent.click(orderButton);
    expect(planets[0]).toHaveTextContent('Coruscant');
    expect(planets[1]).toHaveTextContent('Naboo');
    expect(planets).toHaveLength(10) 
    
  });
});
