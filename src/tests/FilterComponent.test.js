import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import App from "../App"

describe('Testa o componente que renderiza o nome dos filtros',() => {
    test('Verifica se ao clicar em um filtro seu valor é renderizado na tela', () => {
        render(<App />)
        expect(screen.getByTestId('button-filter')).toBeInTheDocument()
         userEvent.click(screen.getByTestId('button-filter'))    
            expect(screen.getByText(/population maior que 0/i)).toBeInTheDocument()
        
    })
    test('', () => {
        
    })
})