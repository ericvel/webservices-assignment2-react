const express = require('express');
const router = express.Router();
const Url = require('../../../models/Url');

//Request Sepcific Original Url
router.get('/:id', async (req, res) =>
{
  try
  {
    const url = await Url.findOne({ urlCode: req.params.id });
    if (url) 
    {
      return res.status(301).json(url.longUrl);
    }//if
    else 
    {
      return res.status(404).json('No url found');
    }//else
  }//try
  catch (err) 
  {
    console.error(err);
    res.status(500).json('Server error');
  }//catch
});//GET request Original Url

//Request all Urls  
router.get('/', async (res) =>
{
  try
  {
    const url = await Url.find();
    return res.status(200).json(url);
  }//try
  catch (err) 
  {
    console.error(err);
    res.status(500).json('Server error');
  }//catch
});//GET request All Urls

module.exports = router;
