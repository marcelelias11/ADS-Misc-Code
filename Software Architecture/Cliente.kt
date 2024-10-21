class Cliente { //Classe principal que será chamada no main
    private val fabrica = FabricaNotificacao() //Composição da classe FabricaNotificacao na classe Cliente
    fun principal(canal:String) { //Método que gerencia qual canal será utilizado para notificar o cliente
        fabrica.criarNotificacao(canal)
    }
}

interface Notificacao { //Interface base das notificações
    fun notificarUsuario(mensagem:String){}
}

class NotificacaoEmail : Notificacao{ //Notificação por email, implementa a interface Notificação
    override fun notificarUsuario(mensagem:String){
        return println("Enviar $mensagem")
    }
}

class NotificacaoSMS : Notificacao{ //Notificação por SMS, implementa a interface Notificação
    override fun notificarUsuario(mensagem:String){
        return println("Enviar $mensagem")
    }
}

class NotificacaoPush : Notificacao{ //Notificação por Push, implementa a interface Notificação
    override fun notificarUsuario(mensagem:String){
        return println("Enviar $mensagem")
    }
}

class NotificacaoNone : Notificacao {
    override fun notificarUsuario(mensagem:String){
        return println("$mensagem não é um método válido")
    }
}

class FabricaNotificacao (){ //Classe que gerencia qual tipo de notificação será utilizada
    val notificacoes: MutableList<Notificacao> = mutableListOf(NotificacaoEmail(), NotificacaoSMS(), NotificacaoPush()) //Lista mutável das notificações, composição da interface Notificacao
    val notificacoesref: MutableList<String> = mutableListOf("Email", "SMS", "Push") //Lista para facilidade de acesso às classes
    val error = "Método Inválido"

    //Nota: Seguir o diagrama a risca faz com que o primeiro requisito não seja cumprido, por isso a criação das listas

    fun addObserver(notificacao:Notificacao,ref:String){ //Adiciona uma nova notificação
        notificacoes.add(notificacao)
        notificacoesref.add(ref)
    }
    fun removeObserver(notificacao:Notificacao,ref:String){ //Remove a notificação escolhida
        notificacoes.remove(notificacao)
        notificacoesref.remove(ref)
    }
    fun criarNotificacao(canal: String){ //Função que cria a notificação escolhida 
        val not = notificacoesref.indexOf(canal) //Busca o índice da notificação escolhida
        if (not == -1) { //Caso seja colocado um argumento inválido na função
            return NotificacaoNone().notificarUsuario(canal)
        }
        else { //Cria a notificação com base no argumento recebido
            return notificacoes[not].notificarUsuario(canal)
        }        
}} /*Nota: Tipar essa função com o tipo "Notificacao?" causa erro ao chamar o método,
    * e nenhuma resposta caso a classe requerida seja chamada na forma "NotificacaoSMS"
    * ou "NotificacaoPush", sem os parênteses*/

fun main() { //Execução do código
    val clienteObj = Cliente() //Construção do objeto que será utilizado
    clienteObj.principal("SMS") //Método que irá executar o código
}



//Código testado no https://play.kotlinlang.org/