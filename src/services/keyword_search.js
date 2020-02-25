"use strict"
const OnetWebService = require('./OnetWebService')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function get_user_input_once(prompt) {
  return new Promise((resolve, reject) => {
      rl.question(prompt + ': ', (input) => resolve(input.trim()) )
    })
}
async function get_user_input(prompt) {
  let input = ''
  while (!input.length) {
    input = await get_user_input_once(prompt)
  }
  return input
}

function check_for_error(service_result) {
  if (service_result.hasOwnProperty('error')) {
    throw new Error(service_result.error)
  }
}

(async () => {
  try {
    let abilities = []
    let skills = [] 
    let techSkills = []
    let knowledge = []
    let tasks = []
    let tools = []
    let hTech = []

    const onet_ws = new OnetWebService()

    const vinfo = await onet_ws.call('about')
    check_for_error(vinfo)
    console.log('Connected to O*NET Web Services version ' + vinfo.api_version)
    console.log('')

    const kwquery = await get_user_input('Keyword search query')
    const kwresults = await onet_ws.call('online/search', {
                                            keyword: kwquery,
                                            end: 3 })
    check_for_error(kwresults)
    if (!kwresults.hasOwnProperty('occupation') || !kwresults.occupation.length) {
      console.log('No relevant occupations were found.')
      console.log('')
    } else {
      console.log('Most relevant occupations for "' + kwquery + '":')
      let i = 0
      for (let occ of kwresults.occupation) {
        console.log('  ' + occ.code + ' - ' + occ.title)
        const techSkillsRes = await onet_ws.call('online/occupations/'+occ.code+'/summary/technology_skills')
        if (!techSkills.includes(techSkillsRes.category[i].title.name)) {
          techSkills.push(techSkillsRes.category[i].title.name)
        } else {
          techSkills.push(techSkillsRes.category[i+1].title.name)
        }

        const skillsRes = await onet_ws.call('online/occupations/'+occ.code+'/summary/skills')
        if (!skills.includes(skillsRes.element[i].name)) {
          skills.push(skillsRes.element[i].name)
        } else {
          skills.push(skillsRes.element[i+1].name)
        }
        
        const abilityRes = await onet_ws.call('online/occupations/'+occ.code+'/summary/abilities')
        if (!abilities.includes(abilityRes.element[i].name)) {
          abilities.push(abilityRes.element[i].name)
        } else {
          abilities.push(abilityRes.element[i+1].name)
        }

        const knowledgeRes = await onet_ws.call('online/occupations/'+occ.code+'/summary/knowledge')
        if (!knowledge.includes(knowledgeRes.element[i].name)) {
          knowledge.push(knowledgeRes.element[i].name)
        } else {
          knowledge.push(knowledgeRes.element[i+1].name)
        }

        const tasksRes = await onet_ws.call('online/occupations/'+occ.code+'/summary/tasks')
        if (!tasks.includes(tasksRes.task[i].name)) {
          tasks.push(tasksRes.task[i].name)
        } else {
          tasks.push(tasksRes.task[i+1].name)
        }

        const toolsRes = await onet_ws.call('online/occupations/'+occ.code+'/summary/tools_used')
        if (!tools.includes(toolsRes.category[i].title.name)) {
          tools.push(toolsRes.category[i].title.name)
        } else {
          tools.push(toolsRes.category[i+1].title.name)
        }
        
        const hotTechRes = await onet_ws.call('online/hot_technology')
        
        hotTechRes.technology.some(tech => {
          if(tech.name.includes(kwquery)){
            hTech.push(tech.name)
          }
          if(hTech.length == 3){
            return
          }
      })

      }
      console.log('')     
    }
    

    console.log('  Technology Skills:')
    techSkills.forEach(tSkill => console.log('    '+tSkill))

    console.log('  Skills:')
    skills.forEach(skill => console.log('    '+skill))

    console.log('  Abilities:')
    abilities.forEach(ability => console.log('    '+ability))

    console.log('  Knowledge:')
    knowledge.forEach(info => console.log('    '+info))

    console.log('  Tools:')
    tools.forEach(tool => console.log('    '+tool))

    console.log('  Tech:')
    hTech.some(tech => {
      console.log('    '+tech)
      if(hTech.length >= 3){
        return
      }
    })

  

  } catch (error) {
    console.error(error.message)
  }
  rl.close()
})()