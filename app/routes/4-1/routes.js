module.exports = function (router) {

    var version = "4-1";

    router.all('/' + version + '/*', function (req, res, next) {
      
      // Reset page validation to false by default. Will only be set to true, if applicable, on a POST of a page
      req.session.validationErrors = {}
      req.session.validationError = "false"

      next()
    })

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

      router.post('/' + version + '/registration/agreement-check', function (req, res) {

        let _agreementCheck = req.body.agreementCheck

        if(!_agreementCheck){
          req.session.validationError = "true"
          req.session.validationErrors.agreementCheck = {
              "anchor": "agreementCheck-1",
              "message": "Select whether you want to review the agreement now or later"
          }
        }
      
        if(req.session.validationError == "true") {
          res.render(version + '/registration/agreement-check', {
            validationError: req.session.validationError,
            validationErrors: req.session.validationErrors
          });
        } else {
          if (_agreementCheck === 'no') {
            res.redirect('/' + version + '/registration/homepage-signAgreement')
          } else {
            res.redirect('/' + version + '/registration/agreement')
          }
        }
      })
    
      router.post('/' + version + '/registration/agreement', function (req, res) {
        
        let _agreementSign = req.body.agreementSign

        if(!_agreementSign){
          req.session.validationError = "true"
          req.session.validationErrors.agreementSign = {
              "anchor": "agreementSign-1",
              "message": "Select whether you accept the agreement now or will accept it later"
          }
        }
      
        if(req.session.validationError == "true") {
          res.render(version + '/registration/agreement', {
            validationError: req.session.validationError,
            validationErrors: req.session.validationErrors
          });
        } else {
          if (_agreementSign === 'yesSign') {
            res.redirect('/' + version + '/registration/interim-homepage')
          } else {
            res.redirect('/' + version + '/registration/homepage-signAgreement')
          }
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

