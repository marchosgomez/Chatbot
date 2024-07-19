const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const JsonFileAdapter = require('@bot-whatsapp/database/json')
const servidorHttp = require('./http/index.js')

// Cada flow es una posible pregunta y respuesta, y de uno se va a otro.

const flowSecundario = addKeyword(['2', 'siguiente'])
    .addAnswer(['📄 Aquí tenemos el flujo secundario'])

const flowDocs = addKeyword(['doc', 'documentacion', 'documentación'])
    .addAnswer(
        [
            '📄 Aquí encontras las documentación recuerda que puedes mejorarla',
            'https://bot-whatsapp.netlify.app/',
            '\n*2* Para siguiente paso.',
        ],
        null,
        null,
        [flowSecundario]
    )

const flowPrincipal = addKeyword(['hola', 'ole', 'alo'])
    .addAnswer('🙌 Hola bienvenido a este *Chatbot*')
    .addAnswer(
        [
            'te comparto los siguientes links de interes sobre el proyecto',
            '👉 *doc* para ver la documentación',
            '👉 *gracias*  para ver la lista de videos',
            '👉 *discord* unirte al discord',
        ],
        null,
        null,
        [flowDocs]
    )

// Proceso principal

const main = async () => {
    const servidor = new servidorHttp()
    const adapterDB = new JsonFileAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    await createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
    servidor.start()
}

main()
