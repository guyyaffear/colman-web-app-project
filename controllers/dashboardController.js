async function sendToDashboard(req, res) {
    if (req.session.email){
        res.render('dashboard',{userName:req.session.email});
    } else{
        res.render('errorPage', {userName:null,errorMessage:"please login in "});
    }
  }

  module.exports = {
    sendToDashboard
  }