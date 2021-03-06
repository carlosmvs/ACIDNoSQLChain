import mongoose from 'mongoose'
import MongoChainSenderModel from './MongoChainSenderModel'
import MongoChainRecipientModel from './MongoChainRecipientModel'
import MongoChainTransferenceModel from './MongoChainTransferenceModel'

class MongoChainEntityController {

  async storeSender(req, res) {
    try {
      const sender = await MongoChainSenderModel.create(req.body)
      res.json(sender)
    } catch (err) {
      throw err
    }
  }

  async storeRecipient(req, res) {
    try {
      let recipient = await MongoChainRecipientModel.create(req.body)
      res.json(recipient)
    } catch (err) {
      throw err
    }
  }

  async updateTransference(req, res) {
    const sessionTransference = await mongoose.startSession()
    sessionTransference.startTransaction({
      readConcern: { level: 'snapshot' },
      writeConcern: { w: 'majority' }
    })
    try {
      let sender = await MongoChainSenderModel.findById(req.body.senderId)
      let recipient = await MongoChainRecipientModel.findById(req.body.recipientId)
      let transference = await MongoChainTransferenceModel.findById(req.params.id)
      sender.amount -= req.body.amount
      recipient.amount += req.body.amount
      transference.status = 'done'
      await MongoChainSenderModel.findByIdAndUpdate(req.body.senderId, sender).session(sessionTransference)
      await MongoChainRecipientModel.findByIdAndUpdate(req.body.recipientId, recipient).session(sessionTransference)
      await MongoChainTransferenceModel.findByIdAndUpdate(req.params.id, transference).session(sessionTransference)
      await sessionTransference.commitTransaction()
      res.json({ message: "OK" })
    } catch (err) {
      await sessionTransference.abortTransaction()
    } finally {
      sessionTransference.endSession()
    }
  }

  async deleteTransference(req, res) {
    const sessionTransference = await mongoose.startSession()
    sessionTransference.startTransaction({
      readConcern: { level: 'snapshot' },
      writeConcern: { w: 'majority' }
    })
    try {
      
      let transference = await MongoChainTransferenceModel.findById(req.params.id)
      let sender = await MongoChainSenderModel.findById(transference.senderId)
      let recipient = await MongoChainRecipientModel.findById(transference.recipientId)
      sender.amount += transference.amount
      recipient.amount -= transference.amount
      await MongoChainSenderModel.findByIdAndUpdate(transference.senderId, sender).session(sessionTransference)
      await MongoChainRecipientModel.findByIdAndUpdate(transference.recipientId, recipient).session(sessionTransference)
      await MongoChainTransferenceModel.findByIdAndDelete(transference._id).session(sessionTransference)
      await sessionTransference.commitTransaction()
      res.json({ message: "OK" })
    } catch (err) {
      await sessionTransference.abortTransaction()
    } finally {
      sessionTransference.endSession()
    }
  }

  async indexTransference(req, res) {
    try {
      const transferences = await MongoChainTransferenceModel.find()
      res.json(transferences)
    } catch (err) {
      throw err
    }
  }

  async showTransferenceBySenderId(req, res) {
    try {
      const transferences = await MongoChainTransferenceModel.find()
      let senders = transferences.filter(sender => {
        return sender.senderId = req.params.senderId
      })
      res.json(senders)
    } catch (err) {
      throw err
    }
  }

  async showTransferenceByRecipientId(req, res) {
    try {
      const transferences = await MongoChainTransferenceModel.find()
      let recipients = transferences.filter(recipient => {
        return recipient.recipientId == req.params.recipientId
      })
      res.json(recipients)
    } catch (err) {
      throw err
    }
  }
}

export default new MongoChainEntityController()
