object ConfigSingleton { //Criação de Singleton das configurações no Kotlin (fonte:https://kotlinlang.org/docs/object-declarations.html)     
    private val configtitlelist:MutableList<String> = mutableListOf("app.theme", "app.language", "app.version", "app.promptSound")
    private val configvaluelist:MutableList<String> = mutableListOf("light", "pt-br", "0.0", "test.ogg")//Armazenamento das configurações do app
    private var title:String = ""
    private var values:String = "" //Armazena as configurações para display
    
    fun updateConfig (config1:String,config2:String) { //Método para mudar as confiurações do app
        val configindex = configtitlelist.indexOf("app." + config1)
        configvaluelist[configindex] = config2
        
        println("Successfuly updated settings")
    }
    fun displayConfig() { //Método para conferir as configurações do app
        for (i in configtitlelist.indices) { //Loop que itera por todas as configurações
            title = configtitlelist[i]
            values = configvaluelist[i]
            println("$title=$values")
        }
    }
    fun addConfig(config1:String,config2:String){ //Adiciona uma nova configração
        configtitlelist.add(config1)
        configvaluelist.add(config2)
    }
    fun removeConfig(config1:String,config2:String){ //Remove a configuração escolhida
        configtitlelist.remove(config1)
        configvaluelist.remove(config2)
    }
}

fun main() { //Execução do código
    val config = ConfigSingleton //Instanciamento da Singleton
    config.updateConfig("theme","dark")
    config.updateConfig("language","en")
    config.updateConfig("version","2.0")
    config.updateConfig("promptSound","solaris.ogg") //Configurações desejadas
    config.displayConfig() //Mostrar as configurações atuais
}

//Código testado no https://play.kotlinlang.org/