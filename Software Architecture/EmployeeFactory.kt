// Interface Funcionario
interface Funcionario {
    fun calcularSalario(): Double
    fun detalhes(): String
}

// Implementações específicas para cada tipo de funcionário
class CLTDedicacaoExclusiva(private val nome: String, private val salario: Double) : Funcionario {
    override fun calcularSalario(): Double = salario

    override fun detalhes(): String = "Funcionario DE: $nome, Salario: $salario"
}

class CLTHorista(private val nome: String, private val horasTrabalhadas: Int, private val valorHora: Double) : Funcionario {
    override fun calcularSalario(): Double = horasTrabalhadas * valorHora

    override fun detalhes(): String = "Funcionario Horista: $nome, Salario: ${calcularSalario()}"
}

class ContratoPessoaFisica(private val nome: String, private val cpf: String, private val valorContrato: Double) : Funcionario {
    override fun calcularSalario(): Double = valorContrato

    override fun detalhes(): String = "Contrato F: $nome, CPF: $cpf, Valor Contrato: $valorContrato"
}

class ContratoPessoaJuridica(private val nome: String, private val cnpj: String, private val valorContrato: Double) : Funcionario {
    override fun calcularSalario(): Double = valorContrato

    override fun detalhes(): String = "Contrato J: $nome, CNPJ: $cnpj, Valor Contrato: $valorContrato"
}

// Classe FuncionarioFactory
class FuncionarioFactory {
    fun criarFuncionario(dados: String): Funcionario {
        val partes = dados.split(":")
        val tipo = partes[0]
        val info = partes[1].split(",")

        return when (tipo) {
            "CLTDE" -> CLTDedicacaoExclusiva(info[0], info[1].toDouble())
            "CLTH" -> CLTHorista(info[0], info[1].toInt(), info[2].toDouble())
            "CF" -> ContratoPessoaFisica(info[0], info[1], info[2].toDouble())
            "CJ" -> ContratoPessoaJuridica(info[0], info[1], info[2].toDouble())
            else -> throw IllegalArgumentException("Tipo de funcionário desconhecido")
        }
    }
}

// Classe EmployeeDatabase fornecida no desafio
class EmployeeDatabase {
    fun getEmployeeRawData(): List<String> {
        return listOf(
            "CLTDE:jorge,5000",
            "CLTH:ana,15,25",
            "CF:paulo,05120263361,10000",
            "CJ:sergipeTec,000000,15000"
        )
    }
}

// Função principal para testar o módulo
fun main() {
    val database = EmployeeDatabase()
    val factory = FuncionarioFactory()
    val funcionarios = database.getEmployeeRawData().map { factory.criarFuncionario(it) }

    funcionarios.forEach {
        println(it.detalhes())
        println("Salario calculado: ${it.calcularSalario()}")
        println()
    }
}
