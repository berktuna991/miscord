import { Server } from '../types/fastify'
import { Guild, GuildChannel } from 'discord.js'

function channel ({ type, name, id, parent }: GuildChannel) {
  return {
    type, name, id,
    category: parent ? parent.id : null
  }
}

function guild ({ name, id, channels }: Guild) {
  return {
    name, id,
    channels: channels.array().map(channel)
  }
}

export default async (app: Server) => {
  app.get('/guilds', async (request, reply) => {
    return discord.client.guilds.array().map(guild)
  })
  app.get('/guilds/:guild/channels', async (request, reply) => {
    return discord.client.guilds.get(request.params.guild)!!.channels.array().map(channel)
  })
}
