import { KafkaClient } from 'kafka-node'

export function waitKafkaClientForConnection(client: KafkaClient) {
  return new Promise(resolve => client.once('ready', resolve))
}
