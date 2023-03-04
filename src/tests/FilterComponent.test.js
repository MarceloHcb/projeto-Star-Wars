import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { mockData } from "../helpers/mockData";

describe("Testa o componente que renderiza o nome dos filtros", () => {
  beforeEach(async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
      })
    );
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
    render(<App />);
    userEvent.type(screen.getByTestId("value-filter"), 3000);
    userEvent.selectOptions(screen.getByTestId("column-filter"), "population");
    userEvent.selectOptions( screen.getByTestId("comparison-filter"), "menor que" );
    userEvent.click(screen.getByTestId("button-filter"));
    userEvent.selectOptions(
      screen.getByTestId("column-filter"),
      "orbital_period"
    );
    userEvent.selectOptions(
      screen.getByTestId("comparison-filter"),
      "maior que"
    );
    userEvent.click(screen.getByTestId("button-filter"));
    userEvent.clear(screen.getByTestId("value-filter"));
    userEvent.selectOptions(
      screen.getByTestId("column-filter"),
      "surface_water"
    );
    userEvent.selectOptions(screen.getByTestId("comparison-filter"), "igual a");
    userEvent.type(screen.getByTestId("value-filter"), 1);
    userEvent.click(screen.getByTestId("button-filter"));
    const table = await screen.findByRole("table");
    expect(table).toBeInTheDocument();
  });
  test('',async() => {
    render(<App />);
    userEvent.selectOptions(screen.getByTestId("column-filter"), "surface_water");
    userEvent.selectOptions( screen.getByTestId("comparison-filter"), "igual a" );
    userEvent.type(screen.getByTestId("value-filter"), 1);
    userEvent.click(screen.getByTestId("button-filter"));
    const table = await screen.findByRole("table");
    expect(table).toBeInTheDocument();
  })
  test('', async() => {
    render(<App />);
    userEvent.selectOptions(screen.getByTestId("column-filter"), "diameter");
    userEvent.selectOptions( screen.getByTestId("comparison-filter"), "maior que" );
    userEvent.type(screen.getByTestId("value-filter"), 1);
    userEvent.click(screen.getByTestId("button-filter"));
    const table = await screen.findByRole("table");
    expect(table).toBeInTheDocument();
  })
  test("Verifica se renderiza o botão de remover apenas um filtro", () => {
    render(<App />);
    userEvent.type(screen.getByTestId("value-filter"), 3000);
    userEvent.selectOptions(screen.getByTestId("column-filter"), "population");
    userEvent.selectOptions(screen.getByTestId("comparison-filter"),"menor que" );
    userEvent.selectOptions(screen.getByTestId("column-filter"), "population");
    userEvent.selectOptions(screen.getByTestId("comparison-filter"),"maior que" );
    userEvent.selectOptions(screen.getByTestId("column-filter"), "population");
    userEvent.selectOptions(screen.getByTestId("comparison-filter"),"igual a" );
    userEvent.click(screen.getByTestId('button-filter'))
    userEvent.selectOptions(screen.getByTestId("column-filter"), "diameter");
    userEvent.selectOptions(screen.getByTestId("comparison-filter"),"maior que" );
    userEvent.click(screen.getByTestId('button-filter'))
    userEvent.selectOptions(screen.getByTestId("column-filter"), "orbital_period");
    userEvent.selectOptions(screen.getByTestId("comparison-filter"),"igual a" );
    userEvent.click(screen.getByTestId('button-filter'))
    expect(screen.getAllByRole("button", { name: /x/i })[0]).toBeInTheDocument();
     userEvent.click(screen.getAllByRole("button", { name: /x/i })[0])    
     userEvent.click(screen.getAllByRole("button", { name: /x/i })[1])    

  });
  test('Verifica se ao clicar no botão de remover todos os filtros, nenhum filtro é renderizado na tela',() => {
    render(<App />);
    userEvent.type(screen.getByTestId("value-filter"), 3000);
    userEvent.selectOptions(screen.getByTestId("column-filter"), "population");
    userEvent.selectOptions( screen.getByTestId("comparison-filter"),"maior que" );
    userEvent.click(screen.getByTestId('button-filter'))
    const buttonRemove = screen.getByTestId('button-remove-filters')
    expect(screen.getByRole('heading', { name: /population maior que 0/i })).toBeInTheDocument()
    userEvent.click(buttonRemove)   
  })
  test("Verifica os filtros de ordenação", async () => {
    render(<App />);

    const sortSelect = await screen.findByTestId("column-sort");
    const ascButton = await screen.findByTestId("column-sort-input-asc");
    const descButton = await screen.findByTestId("column-sort-input-desc");
    const orderButton = await screen.findByTestId("column-sort-button");
    const planets = await screen.findAllByTestId("planet-name");
    expect(planets).toHaveLength(10);
    const table = await screen.findByRole("table");
    expect(table).toBeInTheDocument();
    userEvent.selectOptions(sortSelect, "population");
    userEvent.click(descButton);
    userEvent.click(orderButton);
    expect(planets[0]).toHaveTextContent("Coruscant");
    expect(planets[1]).toHaveTextContent("Naboo");
    expect(planets).toHaveLength(10);
    userEvent.selectOptions(sortSelect, "rotation_period");
    userEvent.click(ascButton);
    userEvent.click(orderButton);
    expect(planets[0]).toHaveTextContent("Bespin");
    expect(planets[1]).toHaveTextContent("Endor");
    expect(planets[2]).toHaveTextContent("Dagobah");
    userEvent.selectOptions(sortSelect, "orbital_period");
    userEvent.click(descButton);
    userEvent.click(orderButton);
    expect(planets[0]).toHaveTextContent("Bespin");
    expect(planets[1]).toHaveTextContent("Yavin IV");
    userEvent.selectOptions(sortSelect, "diameter");
    userEvent.click(descButton);
    userEvent.click(orderButton);
    expect(planets[0]).toHaveTextContent("Bespin");
    expect(planets[1]).toHaveTextContent("Kamino");
    userEvent.selectOptions(sortSelect, "surface_water");
    userEvent.click(ascButton);
    userEvent.click(orderButton);
    expect(planets[0]).toHaveTextContent("Bespin");
    expect(planets[1]).toHaveTextContent("Tatooine");
    userEvent.click(descButton);
    userEvent.click(orderButton);
    expect(planets[0]).toHaveTextContent("Hoth");
    expect(planets[1]).toHaveTextContent("Kamino");
  });  
});
