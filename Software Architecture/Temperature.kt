class Cliente(val temp:Float) { //Classe principal que será chamada no main, com um argumento representando a temperatura
    val tempsens = TemperaturaSensor(temp) //Composição da classe TemperaturaSensor na classe Cliente, com o argumento temp
    fun executar(){ //Método que irá executar as funcionalidades
        tempsens.setTemperature(temp) //Modifica a temperatura no sensor 
    }
}

open class TemperaturaSensor(val temp:Float):Subject { //Classe responsável pelo sensor de temperatura, recebe a temperatura em sua inicialização
    private val observers: MutableList<Observer> = mutableListOf(Display(), Logger(), AlertSystem()) //Lista mutável dos observadores, composição da interface Observer
    private var temperature = 0.0.toFloat() //Armazena a temperatura
    
    override fun addObserver(observer:Observer){ //Adiciona um novo observador
        observers.add(observer)
    }
    override fun removeObserver(observer:Observer){ //Remove o observador escolhido
        observers.remove(observer)
    }
    override fun notifyObserver(){ //Notifica o observador sobre a temperatura atual
        observers[0].update(temperature)
        observers[1].update(temperature)
        observers[2].update(temperature)
    }
    fun setTemperature(newTemperature: Float){ //Modifica a temperatura medida
        temperature = newTemperature
        notifyObserver() //Notifica o observador da temperatura atual
    }
}

interface Subject { //Interface base para adicionar, remover ou notificar os observadores
    fun addObserver(observer:Observer)
    fun removeObserver(observer:Observer)
    fun notifyObserver()
}

interface Observer { //Interface base dos observadores
    fun update(temperature: Float)
}

class Display:Observer { //Observador do tipo "Display"
    override fun update(temperature: Float) {
        println("Display: $temperature")
    }
}
class Logger:Observer { //Observador do tipo "Logger"
    override fun update(temperature: Float) {
        println("Logger: $temperature")
    }
}
class AlertSystem:Observer { //Observador do tipo "Alerta"
    override fun update(temperature: Float){
        println("Alert: $temperature")
    }
}

fun main(){ //Execução do código
    val cliente = Cliente(25.0.toFloat()) //Criação do objeto baseado na classe principal
    cliente.executar() //Método que executará o código
}

//Código testado no https://play.kotlinlang.org/