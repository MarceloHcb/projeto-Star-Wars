import Table from "../components/Table/Table"
import { render, screen, waitFor } from "@testing-library/react"
import App from "../App"

describe('Testa o component Table', () => {
    test('verifica se a tabela é renderizada corretamente', async() => {
        render(<Table/>)
        await waitFor(() => {                   
            expect(screen.getByRole('table')).toBeInTheDocument()
        })       
    })
    
})