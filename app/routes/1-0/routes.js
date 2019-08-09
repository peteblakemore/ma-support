module.exports = function (router) {

    var version = "1-0";

    //
    // For setting team variable (different routing for compliance team)
    // "default" is set on the main index and first page in reg journey UNLESS a query string is present
    // compliance team use the query sting "?team=compliance" to override the team variable
    // this team variable is used for alternate routing and navigation within the routes file and pon specific pages
    //
    router.all('/' + version + '/*', function (req, res, next) {
      req.session.team = req.query.team || req.session.team
      next()
    })
    router.get([
      '/index',
      '/' + version + '/registration/index'
    ], function (req, res, next) {
      req.session.team = req.query.team || "default"
      next()
    })

    router.post('/' + version + '/registration/gov-funding', function (req, res) {
      
        let answer = req.session.data['add-your-paye']
      
        if (answer === 'yes') {
          res.redirect('/' + version + '/registration/ways-to-add-paye')
        } else {
          res.redirect('/' + version + '/registration/homepage-addPAYE')
        }
      })
    
    // Ways to add your PAYE scheme
      router.post('/' + version + '/registration/ways-to-add-paye', function (req, res) {
      
        let answer = req.session.data['ways-to-add-your-paye']
      
        if (answer === 'govgateway') {
          res.redirect('/' + version + '/registration/using-your-gg')
        } else {
          res.redirect('/' + version + '/registration/pensionsReg')
        }
      })
      
      // Compliance team - agreement
      router.get('/' + version + '/registration/agreement', function (req, res) {
        res.render(version + '/registration/agreement', {
          _referrer:req.query.referrer
        });
      })
      router.post('/' + version + '/registration/agreement', function (req, res) {
        let answer = req.session.data['agreementSign']
        if (answer === 'yesSign') {
          res.redirect('/' + version + '/registration/interim-homepage')
        } else {
          res.redirect('/' + version + '/registration/homepage-signAgreement')
        }
      })
    
      router.post('/' + version + '/registration/agreement/v1/agreement', function (req, res) {
      
        let answer = req.session.data['agreementSign']
        let emailJourney = req.session.data['email-journey']
        
        if (answer === 'yesSign') {
          if (emailJourney == 'true') {
            req.session.data['email-journey'] = ''
            res.redirect('/' + version + '/registration/provider-led/provider-permission')
          } else {
            res.redirect('/' + version + '/registration/interim-homepage')
          }
        } else {
          res.redirect('/' + version + '/registration/homepage-signAgreement')
        }
      })

      
      router.post('/' + version + '/registration/gov-gateway', function (req, res) {
      
        let ggid = req.session.data['gatewayLogin']
        let ggpassword = req.session.data['gatewayPassword']
      
        if (ggid ==='abcd123') {
          res.redirect('/' + version + '/registration/multiOrgsGG')
        } else {
          res.redirect('/' + version + '/registration/check-your-details')
        }
      })
      

      router.post('/' + version + '/registration/multiOrgsGG', function (req, res) {
      
        let answer = req.session.data['orgNotListed']
      
        if (answer === 'OrgNot') {
          res.redirect('/' + version + '/registration/searchOrg')
        } else {
          res.redirect('/' + version + '/registration/check-your-gg-details-from-multiorg')
        }
      })

      router.get('/' + version + '/registration/check-your-aorn-details-from-multiorg', function (req, res) {
        res.render(version + '/registration/check-your-aorn-details-from-multiorg', {
          team:req.session.team
        });
      })
      router.get('/' + version + '/registration/check-your-details-aorn', function (req, res) {
        res.render(version + '/registration/check-your-details-aorn', {
          team:req.session.team
        });
      })
      router.get('/' + version + '/registration/check-your-details', function (req, res) {
        res.render(version + '/registration/check-your-details', {
          team:req.session.team
        });
      })
      router.get('/' + version + '/registration/check-your-gg-details-from-multiorg', function (req, res) {
        res.render(version + '/registration/check-your-gg-details-from-multiorg', {
          team:req.session.team
        });
      })
      router.get('/' + version + '/registration/homepage-signAgreement', function (req, res) {
        res.render(version + '/registration/homepage-signAgreement', {
          team:req.session.team
        });
      })

      router.post('/' + version + '/registration/pensionsReg', function (req, res) {
      
        let aornnumber = req.session.data['employerRegisterAORN']

      
        if (aornnumber ==='123PA12345678') {
          res.redirect('/' + version + '/registration/multiOrgsAORN')
        } else {
          res.redirect('/' + version + '/registration/check-your-details-aorn')
        }
      })

      router.post('/' + version + '/registration/multiOrgsAORN', function (req, res) {
      
        let answer = req.session.data['orgNotListed']
      
        if (answer ==='OrgNot') {
          res.redirect('https://www.gov.uk/tell-hmrc-change-address')
        } else {
          res.redirect('/' + version + '/registration/check-your-aorn-details-from-multiorg')
        }
      })


// Provider-led Registration

router.post('/' + version + '/registration/provider-led/employer-permission', function (req, res) {
    
  let answer = req.session.data['permission-training-provider']

  if (answer === 'yesGive') {
    res.redirect('/' + version + '/registration/provider-led/new-employer-user')
  } else {
    res.redirect('/' + version + '/registration/provider-led/index')
  }
})



router.post('/' + version + '/registration/provider-led/changePermissions', function (req, res) {
      
  let answer = req.session.data['manage-apprenticeship-yes']

  if (answer ==='yesGivePermission') {
    res.redirect('/' + version + '/registration/provider-led/changePermissionsRecruit')
  } else {
    res.redirect('/' + version + '/registration/interim-homepage')
  }
})


 };

