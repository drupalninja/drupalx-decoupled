const pa11y = require('pa11y');
const axios = require('axios');

// Replace with your Storybook URL
const STORYBOOK_URL = 'http://localhost:6006';

async function getStories() {
  const response = await axios.get(`${STORYBOOK_URL}/index.json`);

  return response.data.entries;
}

async function testStory(id) {
  const url = `${STORYBOOK_URL}/iframe.html?id=${id}`;
  console.log(`Testing story: ${id} at ${url}`);

  const results = await pa11y(url, {
    ignore: ['WCAG2AA.Principle1.Guideline1_3.1_3_1.H42.2']
  });
  console.log(results);
}

async function runTests() {
  const stories = await getStories();

  for (const id of Object.keys(stories)) {
    await testStory(id);
  }
}

runTests().catch(console.error);
