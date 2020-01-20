import { Router } from 'express'

const routesBlockchain = new Router()

import ACIDNoSQLChainController from './ACIDNoSQLChainController'
import ACIDNoSQLChainRecipientModel from './ACIDNoSQLChainRecipientModel'

routesBlockchain.post('/blockchain/mongo', ACIDNoSQLChainController.storeBlockchainMongo)

routesBlockchain.get('/blockchain/server', ACIDNoSQLChainController.indexBlockchainMongo)

routesBlockchain.get('/blockchain', ACIDNoSQLChainController.indexBlockchain)

routesBlockchain.post('/node', ACIDNoSQLChainController.storeNode)

routesBlockchain.post('/node/multiple', ACIDNoSQLChainController.storeNodeMultiple)

routesBlockchain.post('/node/broadcast', ACIDNoSQLChainController.storeBroadcastNode)

routesBlockchain.post('/transaction', ACIDNoSQLChainController.storeTransaction)

routesBlockchain.post('/transaction/broadcast', ACIDNoSQLChainController.storeBroadcastTransaction)

routesBlockchain.post('/block', ACIDNoSQLChainController.storeBlock)

routesBlockchain.get('/mine', ACIDNoSQLChainController.indexMine)

routesBlockchain.get('/consensu', ACIDNoSQLChainController.indexConsensu)


routesBlockchain.post('/senders', ACIDNoSQLChainController.storeSender)


routesBlockchain.post('/recipients', ACIDNoSQLChainController.storeRecipient)
routesBlockchain.get('/recipients/:id', ACIDNoSQLChainController.showTransferenceByRecipientId)

routesBlockchain.put('/transferences/:id', ACIDNoSQLChainController.updateTransference)
routesBlockchain.get('/transferences/:senderId', ACIDNoSQLChainController.showTransferenceBySenderId)
routesBlockchain.get('/transferences/:recipientId', ACIDNoSQLChainController.showTransferenceBySenderId)



export default routesBlockchain