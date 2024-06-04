import fs from 'fs';

const svgHeader = '<svg width="150" height="150" xmlns="http://www.w3.org/2000/svg">\n';
const svgFooter = '</svg>\n';

// Function to generate a random integer between min and max (inclusive)
function getRandomInt(min, max) {
    const numSamples = 4;  // Higher number of samples will make the distribution more centered
    let total = 0;
    for (let i = 0; i < numSamples; i++) {
        total += Math.random();
    }
    const average = total / numSamples;
    return Math.floor(min + average * (max - min));
}

const colors = ["blue", "green", "pink", "purple",];

for (let i=0; i < 4; i++) {
    let circles = '';
    const fill = colors[i];
    for (let i = 0; i < 80; i++) {
        const cx = getRandomInt(10, 140);
        const cy = getRandomInt(10, 140);
        const r = 5;
    circles += `  <circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" />\n`;
}
    const svgContent = svgHeader + circles + svgFooter;
    fs.writeFile('cluster_' + i + '.svg', svgContent, (err) => {
        if (err) throw err;
    });
}