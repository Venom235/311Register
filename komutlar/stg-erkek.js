const Discord = require('discord.js')
const datab = require('quick.db')
const ms = require('ms')
const moment = require("moment");
const { parseZone } = require("moment");

exports.run =  async (client, message, args) => {
  
if(!['800447499768430613'].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) 
return message.reply(`Bu Komut İçin Yetkiniz Bulunmamaktadır.`) 
  
const erkek = message.guild.roles.cache.find(r => r.id === '800447507989266482')
const erkek2 = message.guild.roles.cache.find(r => r.id === '800462930436947969')
const erkek3 = message.guild.roles.cache.find(r => r.id === '800462966038069268')
const kayıtsız = message.guild.roles.cache.find(r => r.id === '800447515878359150')
const savelogs = message.guild.channels.cache.find(c => c.id === '800447651766075403')
if(!erkek) return message.channel.send('1.ci Erkek rolü ayarlanmamış.')
if(!erkek2) return message.channel.send('2.ci Erkek rolü ayarlanmamış.')
if(!erkek3) return message.channel.send('3.ci Erkek rolü ayarlanmamış.')
if(!kayıtsız) return message.channel.send('Kayıtsız rolü ayarlanmamış')
if(!savelogs) return message.channel.send('Save log ayarlanmamış.')




const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));

if(!member) return message.channel.send(`Bir kullanıcı belirt.`)
if(member.id === message.author.id) return message.channel.send('Kendini kayıt edemezsin.')
if(member.id === client.user.id) return message.channel.send('Botu kayıt edemezsin.')
if(member.id === message.guild.OwnerID) return message.channel.send('Sunucu sahibini kayıt edemezsin.')
if(member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(`Bu kullanıcı sizden üst/aynı pozsiyondadır.`)
  
if(!args[0]) return message.channel.send('Bir kullanıcı belirt')  
let timereplace = args[0];
let time = timereplace.replace(/y/, ' yıl').replace(/d/, ' gün').replace(/s/, ' saniye').replace(/m/, ' dakika').replace(/h/, ' saat') 
 datab.add('case', 1)
 const sadxstg = await datab.fetch('case')
 var tarih = new Date(Date.now())
 var tarih2 = ms(timereplace)
 var tarih3 = Date.now() + tarih2 + 1296000000
 let ay = moment(Date.now()+1296000000).format("MM")
 let gün = moment(Date.now()+1296000000).format("DD")
 let saat = moment(Date.now()+1296000000).format("HH:mm:ss")
 let yıl = moment(Date.now()+1296000000).format("YYYY")
 let kayıtsaat = `\`${gün} ${ay.replace(/01/, 'Ocak').replace(/02/, 'Şubat').replace(/03/, 'Mart').replace(/04/, 'Nisan').replace(/05/, 'Mayıs').replace(/06/, 'Haziran').replace(/07/, 'Temmuz').replace(/08/, 'Ağustos').replace(/09/, 'Eylül').replace(/10/, 'Ekim').replace(/11/, 'Kasım').replace(/12/, 'Aralık')} ${saat} (${yıl})\``
 
let tag = '³¹¹' 
let name = args[1]
let age = Number(args[2])
if(!name) return message.channel.send('Bir isim belirt.')
if(!age) return message.channel.send('Bir yaş belirt.')
  
datab.add(`yetkili.${message.author.id}.erkek`, 1)
datab.add(`yetkili.${message.author.id}.toplam`, 1)
let alldata = datab.fetch(`yetkili.${message.author.id}.toplam`)

const rol = "800447507989266482";
datab.set(`rol.${message.guild.id}`, rol)
let rol1 = datab.fetch(`rol.${message.guild.id}`)

member.setNickname(`${tag} ${name} | ${age}`)
member.roles.add(erkek)
member.roles.add(erkek2)
member.roles.add(erkek3)
member.roles.remove(kayıtsız)


const embed = new Discord.MessageEmbed()
.setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
.setDescription(`
• ${member}, ${message.author} Tarafından Kayıt Edildi.
• ${erkek}, ${erkek2}, ${erkek3} Rolleri Verildi.
• İsmi \`${tag} ${name} | ${age}\` Olarak Güncellendi.`) 
.setFooter(`${message.author.username} Toplam ${alldata} Kayıta Sahip.`)
.setColor("0x2f3136")
message.channel.send(embed)


const saveall = new Discord.MessageEmbed()
.setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
.addField(`Kayıt Eden`, `${message.author}`, true)
.addField(`Kullanıcı`, `${member}`, true)
.addField(`Roller`, `${erkek}, ${erkek2}, ${erkek3}`, true)
.addField(`İsim`, `\`${tag} ${name} | ${age}\``, true)
.addField(`Kanal`, `\`${message.channel.name}\``, true)
.addField(`Kayıtları`, `\`${alldata}\``, true)
.addField(`Kayıt Saat`, `\`${kayıtsaat}\``, true)
.setFooter('Venom 🖤 Royal')
savelogs.send(saveall)
  
datab.push(`isim.${message.guild.id}`, {
  userID: member.id, 
  isim: name,
  yas: age,
  tag: tag
})

}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['erkek', 'e', 'boy', 'man'],
    permLevel: 0
  }

  exports.help = {
    name: 'erkek',
    description: "Etiketlenen kişiyi erkek rolleriyle kayıt eder.",
    usage: '.erkek @etiket/id İsim Yaş'
  }