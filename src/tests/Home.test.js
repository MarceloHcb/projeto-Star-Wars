import App from "../App"
import { render, screen } from "@testing-library/react"
import { toBeRequired } from "@testing-library/jest-dom/dist/matchers"

describe('Testes na tela Home, sem testar a tabela',() => {
    beforeEach(() => {
        render(<App/>)
    })
test('Verifica se o valor de filtro por texto é renderizado ',() => {
    expect(screen.getByTestId('name-filter')).toBeInTheDocument()    
})
test('Verifica se o filtro de coluna é renderizado',() => {
    expect(screen.getByTestId('column-filter')).toBeInTheDocument()
})
test('Verifica se o filtro de comparação é renderizado',() => {
    expect(screen.getByTestId('comparison-filter')).toBeInTheDocument()
})
test('Verifica se o filtro numérico é renderizado',() => {
    expect(screen.getByTestId('comparison-filter')).toBeInTheDocument()
})
test('Verifica se o botão FILTRAR é renderizado',() => {
    expect(screen.getByTestId('button-filter')).toBeInTheDocument()
})
test('Verifica se o botão REMOVER FILTROS é renderizado', () => {
    expect(screen.getByTestId('button-remove-filters')).toBeInTheDocument()
})
test('Verifica se as opçoes de ordenar coluna são renderizadas',() => {
    expect(screen.getByTestId('column-sort-input-asc')).toBeInTheDocument()
    expect(screen.getByTestId('column-sort-input-desc')).toBeInTheDocument()
})
test('Verifica se o botão de ordenar colunas é renderizado ',() => {
    expect(screen.getByTestId('column-sort-button')).toBeInTheDocument()    
})
})