const path = require('path')
const {mergeFiles} = require('junit-report-merger')
    
const inputPattern = ['results/report-*.xml']

const outputFile = path.join(__dirname, 'results', 'combined-report.xml')

try {
    await mergeFiles(outputFile, inputFiles)
    console.log('Merged, check ./results/combined.xml')
  } catch (err) {
    console.error(error)
  }