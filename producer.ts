import { Producer, KafkaClient } from 'kafka-node'
import { TOPIC_NAME } from './constants'
import { waitKafkaClientForConnection } from './utils'

async function main() {
  const client = new KafkaClient()
  const producer = new Producer(client)

  console.log('Awaiting connection to kafka...')
  await waitKafkaClientForConnection(client)
  console.log('Connection with kafka established')
  console.log(
    `Type something and press enter to send message to "${TOPIC_NAME}" topic`,
  )

  process.stdin.setEncoding('utf-8')
  process.stdin.on('data', data =>
    producer.send([{ messages: data, topic: TOPIC_NAME }], (error, data) => {
      if (error) {
        return console.error('Error during sending message', error)
      }

      console.log('Data after sending message:', data)
    }),
  )
}

main()
