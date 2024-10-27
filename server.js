const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://djfyfhvtefwpgiealmcy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqZnlmaHZ0ZWZ3cGdpZWFsbWN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk0MDkyNDgsImV4cCI6MjA0NDk4NTI0OH0.rMmhI_hxJP1f0ep_pPHRtm9EG9UnQv-qHVhTIglGrVM';
const supabase = createClient(supabaseUrl, supabaseKey);

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

// 라우팅
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/profile', (req, res) => {
  res.render('profile');
});

app.get('/map', (req, res) => {
  res.render('map');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

// 비동기 함수로 변환
app.get('/contactData', async (req, res) => {
  try {
    const { data: selectData, error: selectError } = await supabase
      .from('contacts')
      .select('*');
    if (selectError) throw selectError;
    console.log(selectData);
    res.json(selectData);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving data');
  }
});

app.post('/contactProc', async (req, res) => {
  try {
    const { name, phone, email, memo } = req.body;
    const { data: insertData, error: insertError } = await supabase
      .from('contacts')
      .insert({ name, phone, email, message: memo });
    if (insertError) throw insertError;
    console.log(insertData);
    res.send(`${name} ${phone} ${email} ${memo}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error inserting data');
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
