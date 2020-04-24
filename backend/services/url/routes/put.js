const express = require('express');
const router = express.Router();
const verification = require('../../../jwt_ver');

const Url = require('../../../models/Url');

// Original url update
router.put('/:id', async (req, res) =>
 {
  const header_value = req.header('X-Access-Token');
  if (verification.Verification(header_value))
  {
    try
    {
      const url = await Url.findOne({ urlCode: req.params.id });
      if (url) 
      {
          url.longUrl = req.body.longUrl;
          await url.save();
        return res.status(200).json(url);
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
  }//if
  else
  {
    res.status(403).json('Forbidden');
  }//else
});//PUT request Url Update

module.exports = router;
