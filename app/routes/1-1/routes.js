module.exports = function (router) {

    var version = "1-1";

    router.post('/' + version + '/registration/gov-funding', function (req, res) {
        // Get the answer from session data
        // The name between the quotes is the same as the 'name' attribute on the input elements
        // However in JavaScript we can't use hyphens in variable names
      
        let answer = req.session.data['add-your-paye']
      
        if (answer === 'yes') {
          res.redirect('/' + version + '/registration/ways-to-add-paye')
        } else {
          res.redirect('/' + version + '/registration/homepage-addPAYE')
        }
      })
    
    
      router.post('/' + version + '/registration/ways-to-add-paye', function (req, res) {
        // Get the answer from session data
        // The name between the quotes is the same as the 'name' attribute on the input elements
        // However in JavaScript we can't use hyphens in variable names
      
        let answer = req.session.data['ways-to-add-your-paye']
      
        if (answer === 'govgateway') {
          res.redirect('/' + version + '/registration/using-your-gg')
        } else {
          res.redirect('/' + version + '/registration/pensionsReg')
        }
      })
      
      router.get('/' + version + '/registration/agreement', function (req, res) {
        res.render(version + '/registration/agreement', {
          _referrer:req.query.referrer
        });
      })
    
      router.post('/' + version + '/registration/agreement/v1/agreement', function (req, res) {
        // Get the answer from session data
        // The name between the quotes is the same as the 'name' attribute on the input elements
        // However in JavaScript we can't use hyphens in variable names
      
        let answer = req.session.data['agreementSign']
      
        if (answer === 'yesSign') {
          res.redirect('/' + version + '/registration/interim-homepage')
        } else {
          res.redirect('/' + version + '/registration/homepage-signAgreement')
        }
      })

      
      router.post('/' + version + '/registration/gov-gateway', function (req, res) {
        // Get the answer from session data
        // The name between the quotes is the same as the 'name' attribute on the input elements
        // However in JavaScript we can't use hyphens in variable names

        // && ggpassword ==='abcd123'
      
        let ggid = req.session.data['gatewayLogin']
        let ggpassword = req.session.data['gatewayPassword']
      
        if (ggid ==='abcd123') {
          res.redirect('/' + version + '/registration/multiOrgsGG')
        } else {
          res.redirect('/' + version + '/registration/check-your-details')
        }
      })
      

      router.post('/' + version + '/registration/multiOrgsGG', function (req, res) {
        // Get the answer from session data
        // The name between the quotes is the same as the 'name' attribute on the input elements
        // However in JavaScript we can't use hyphens in variable names
      
        let answer = req.session.data['orgNotListed']
      
        if (answer === 'OrgNot') {
          res.redirect('/' + version + '/registration/searchOrg')
        } else {
          res.redirect('/' + version + '/registration/check-your-gg-details-from-multiorg')
        }
      })


      router.post('/' + version + '/registration/pensionsReg', function (req, res) {
        // Get the answer from session data
        // The name between the quotes is the same as the 'name' attribute on the input elements
        // However in JavaScript we can't use hyphens in variable names

        // && ggpassword ==='abcd123'
      
        let aornnumber = req.session.data['employerRegisterAORN']

      
        if (aornnumber ==='123PA12345678') {
          res.redirect('/' + version + '/registration/multiOrgsAORN')
        } else {
          res.redirect('/' + version + '/registration/check-your-details-aorn')
        }
      })

      

      router.post('/' + version + '/registration/multiOrgsAORN', function (req, res) {
        // Get the answer from session data
        // The name between the quotes is the same as the 'name' attribute on the input elements
        // However in JavaScript we can't use hyphens in variable names

        // && ggpassword ==='abcd123'
      
        let answer = req.session.data['orgNotListed']
      
        if (answer ==='OrgNot') {
          res.redirect('https://www.gov.uk/tell-hmrc-change-address')
        } else {
          res.redirect('/' + version + '/registration/check-your-aorn-details-from-multiorg')
        }
      })


 };

