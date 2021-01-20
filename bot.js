const Discord = require('discord.js');//
const client = new Discord.Client();//
const ayarlar = require('./ayarlar.json');//
const chalk = require('chalk');//
const moment = require('moment');//
var Jimp = require('jimp');//
const { Client, Util } = require('discord.js');//
const fs = require('fs');//
const db = require('quick.db');//
const express = require('express');//
require('./util/eventLoader.js')(client);//
const path = require('path');//
const snekfetch = require('snekfetch');//
//

var prefix = ayarlar.prefix;//
//
const log = message => {//
    console.log(`${message}`);//
};

client.commands = new Discord.Collection();//
client.aliases = new Discord.Collection();//
fs.readdir('./komutlar/', (err, files) => {//
    if (err) console.error(err);//
    log(`${files.length} komut yüklenecek.`);//
    files.forEach(f => {//
        let props = require(`./komutlar/${f}`);//
        log(`Yüklenen komut: ${props.help.name}.`);//
        client.commands.set(props.help.name, props);//
        props.conf.aliases.forEach(alias => {//
            client.aliases.set(alias, props.help.name);//
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};



client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }

    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });
client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});
client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(process.env.token);


//-----------------------GİRENE-ROL-VERME----------------------\\     

client.on("guildMemberAdd", member => {
  member.roles.add('800447515878359150'); // UNREGİSTER ROLÜNÜN İDSİNİ GİRİN
});

//-----------------------GİRENE-ROL-VERME----------------------\\     

client.on('ready', ()  => {
let kanal = client.channels.cache.get("800623903364874280")
if(kanal === undefined){
console.log("kanalı bulamıyorum.")
} else {
kanal.join();
}
})

//-----------------------OTO İSİM----------------------\\

client.on("guildMemberAdd", async member => { 
member.setNickname("³¹¹ İsim | Yaş")
});

//-----------------------OTO İSİM----------------------\\


//------------------------HOŞGELDİN-EMBEDSİZ-----------------------\\     

client.on("guildMemberAdd", member => {
    require("moment-duration-format")
      var üyesayısı = member.guild.members.cache.size.toString().replace(/ /g, "    ")
      var üs = üyesayısı.match(/([0-9])/g)
      üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
      if(üs) {
        üyesayısı = üyesayısı.replace(/([0-9])/g, d => {
          return {
            '0': `<a:royal_say0:800625606081511424>`,
            '1': `<a:royal_say1:800625593473040465>`,
            '2': `<a:royal_say2:800625605627871282>`,
            '3': `<a:royal_say3:800625604700667944>`,
            '4': `<a:royal_say4:800625602997518392>`,
            '5': `<a:royal_say5:800625601463582750>`,
            '6': `<a:royal_say6:800625605900763136>`,
            '7': `<a:royal_say7:800625600624066591>`,
            '8': `<a:royal_say8:800625600535986216>`,
            '9': `<a:royal_say9:800625557095841832>`}[d];})}
    const kanal = member.guild.channels.cache.find(r => r.id === "800447584174211112");
    let user = client.users.cache.get(member.id);
    require("moment-duration-format");
      const kurulus = new Date().getTime() - user.createdAt.getTime();  
     const gecen = moment.duration(kurulus).format(` YY **[Yıl,]** DD **[Gün,]** HH **[Saat,]** mm **[Dakika,]** ss **[Saniye]**`) 
    var kontrol;
  if (kurulus < 1296000000) kontrol = '**Hesap Durumu: Güvenilir Değil.** <a:royal_guvensiz:800626521077186560>'
  if (kurulus > 1296000000) kontrol = '**Hesap Durumu: Güvenilir Gözüküyor.** <a:royal_guvenli:800626529842364446>'
    moment.locale("tr");
    kanal.send(`
<a:royal_balon:800633394039881760> **Sunucumuza hoş geldin** <@`+ member + `>, **hesabın** \``+gecen+`\` **tarihinde oluşturulmuş ve** `+kontrol+`

<a:royal_balon:800633394039881760> **Kayıt olmak için** \`Register Arena\` **odalarına geçip** <@&800447499768430613> **yetkilisine teyit vererek kayıt olabilirsin.**

<a:royal_balon:800633394039881760> **Sunucumuzun Tagını Alarak** \`³¹¹\` **Bize Destek Olabilirsin, Ayrıca** \`!tag\` **Yazarak Taga Ulaşabilirsin.**

<a:royal_balon:800633394039881760> **Seninle beraber sunucumuz toplam** `+üyesayısı+ ` **kişiye ulaştı ! **

<a:royal_balon:800633394039881760> **İçerize keyifli vakitler geçirmeni diler, sunucumuzun** <#800631540533952533> **kısmına göz atmanı tavsiye ederiz.**`)});
  

//------------------------HOŞGELDİN-EMBEDSİZ-----------------------\\     


//------------------------ŞÜPHELİ-HESAP-----------------------\\     

client.on("guildMemberAdd", member => {
    var moment = require("moment")
    require("moment-duration-format")
    moment.locale("tr")
     var {Permissions} = require('discord.js');
     var x = moment(member.user.createdAt).add(7, 'days').fromNow()
     var user = member.user
     x = x.replace("birkaç saniye önce", " ")
     if(!x.includes("önce") || x.includes("sonra") ||x == " ") {
    const kytsz = member.guild.roles.cache.find(r => r.id === "800447515878359150") 
     var rol = member.guild.roles.cache.get("800447514909605928") // ŞÜPHELİ HESAP ROLÜNÜN İDSİNİ GİRİN
     var kayıtsız = member.guild.roles.cache.get(kytsz) // UNREGİSTER ROLÜNÜN İDSİNİ GİRİN
     member.roles.add(rol)
     member.roles.remove(kytsz)

  member.user.send('Selam Dostum Ne Yazık ki Sana Kötü Bir Haberim Var Hesabın 1 Hafta Gibi Kısa Bir Sürede Açıldığı İçin Fake Hesap Katagorisine Giriyorsun Lütfen Bir Yetkiliyle İletişime Geç Onlar Sana Yardımcı Olucaktır.')
  setTimeout(() => {
  
  }, 1000)
  
  
     }
          else {
  
          }
      });

//------------------------ŞÜPHELİ-HESAP-----------------------\\     



//-----------------------OTO-TAG-----------------------\\     

client.on("userUpdate", async (oldUser, newUser) => {
  if (oldUser.username !== newUser.username) {
  const tag = '³¹¹'
  const sunucu = '800447074352496641'
  const kanal = '800632922012778556'
  const rol = '800447504910909440'

  try {

  if (newUser.username.includes(tag) && !client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
  await client.channels.cache.get(kanal).send(new Discord.MessageEmbed().setColor("GREEN").setDescription(`${newUser} ${tag} Tagımızı Aldığı İçin <@&${rol}> Rolünü Verdim`));
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.add(rol);
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).send(`Selam ${newUser.username}, Sunucumuzda ${tag} Tagımızı Aldığın İçin ${client.guilds.cache.get(sunucu).roles.cache.get(rol).name} Rolünü Sana Verdim!`)
  }
  if (!newUser.username.includes(tag) && client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
  await client.channels.cache.get(kanal).send(new Discord.MessageEmbed().setColor("RED").setDescription(`${newUser} ${tag} Tagımızı Çıkardığı İçin <@&${rol}> Rolünü Aldım`));
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove(rol);
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).send(`Selam **${newUser.username}**, Sunucumuzda ${tag} Tagımızı Çıkardığın İçin ${client.guilds.cache.get(sunucu).roles.cache.get(rol).name} Rolünü Senden Aldım!`)
  }
} catch (e) {
console.log(`Bir hata oluştu! ${e}`)
 }
}
});



//-----------------------OTO-TAG-----------------------\\     
