module.exports = function (router) {

  var version = "2-0";

  router.post('/' + version + '/provider-led-registration/registration/gov-funding', function (req, res) {
      // Get the answer from session data
      // The name between the quotes is the same as the 'name' attribute on the input elements
      // However in JavaScript we can't use hyphens in variable names
    
      let answer = req.session.data['add-your-paye']
    
      if (answer === 'yes') {
        res.redirect('/' + version + '/provider-led-registration/registration/ways-to-add-paye')
      } else {
        res.redirect('/' + version + '/provider-led-registration/registration/homepage-addPAYE')
      }
    })
  
  
    router.post('/' + version + '/provider-led-registration/registration/ways-to-add-paye', function (req, res) {

      let answer = req.session.data['ways-to-add-your-paye']
    
      if (answer === 'govgateway') {
        res.redirect('/' + version + '/provider-led-registration/registration/using-your-gg')
      } else {
        res.redirect('/' + version + '/provider-led-registration/registration/pensionsReg')
      }
    })
    
  
  
    router.post('/' + version + '/provider-led-registration/registration/agreement', function (req, res) {
    
      let answer = req.session.data['agreementSign']
      let emailJourney = req.session.data['email-journey']
    
      if (answer === 'yesSign') {
        if (emailJourney == 'true') {
          req.session.data['email-journey'] = ''
          res.redirect('/1-0/registration/agreement-full')
        } else {
          res.redirect('/1-0/registration/interim-homepage')
        }
      } else {
        res.redirect('/' + version + '/provider-led-registration/registration/homepage-signAgreement')
      }
    })

    
    router.post('/' + version + '/provider-led-registration/registration/gov-gateway', function (req, res) {

      // && ggpassword ==='abcd123'
    
      let ggid = req.session.data['gatewayLogin']
      let ggpassword = req.session.data['gatewayPassword']
    
      if (ggid ==='abcd123') {
        res.redirect('/' + version + '/provider-led-registration/registration/multiOrgsGG')
      } else {
        res.redirect('/' + version + '/provider-led-registration/registration/check-your-details')
      }
    })
    

    router.post('/' + version + '/provider-led-registration/registration/multiOrgsGG', function (req, res) {

      let answer = req.session.data['orgNotListed']
    
      if (answer === 'OrgNot') {
        res.redirect('/' + version + '/provider-led-registration/registration/searchOrg')
      } else {
        res.redirect('/' + version + '/provider-led-registration/registration/check-your-gg-details-from-multiorg')
      }
    })


    router.post('/' + version + '/provider-led-registration/registration/pensionsReg', function (req, res) {

      // && ggpassword ==='abcd123'
    
      let aornnumber = req.session.data['employerRegisterAORN']
    
      if (aornnumber ==='123PA12345678') {
        res.redirect('/' + version + '/provider-led-registration/registration/multiOrgsAORN')
      } else {
        res.redirect('/' + version + '/provider-led-registration/registration/check-your-details')
      }
    })


    router.post('/' + version + '/provider-led-registration/registration/multiOrgsAORN', function (req, res) {

      // && ggpassword ==='abcd123'
    
      let answer = req.session.data['orgNotListed']
    
      if (answer ==='OrgNot') {
        res.redirect('https://www.gov.uk/tell-hmrc-change-address')
      } else {
        res.redirect('/' + version + '/provider-led-registration/registration/check-your-aorn-details-from-multiorg')
      }
    })


    router.post('/' + version + '/provider-led-registration/registration/changePermissions', function (req, res) {

      let answer = req.session.data['providerManageApprenticeships']
    
      if (answer === 'providerManageApprenticeshipsTrue') {
        res.redirect('/' + version + '/provider-led-registration/registration/changePermissionsRecruit')
      } else {
        res.redirect('/' + version + '/provider-led-registration/registration/interim-homepage')
      }
    })


    router.post('/' + version + '/provider-led-registration/registration/changePermissionsRecruit', function (req, res) {
    
      let answer = req.session.data['providerManageRecruit']
    
      if (answer === 'providerManageRecruitTrue') {
        res.redirect('/' + version + '/provider-led-registration/registration/interim-homepage')
      } else {
        res.redirect('/' + version + '/provider-led-registration/registration/interim-homepage')
      }
    })
    

    router.post('/' + version + '/provider-led-registration/employer-permission', function (req, res) {
    
      let answer = req.session.data['permission-training-provider']
    
      if (answer === 'yesGive') {
        res.redirect('/' + version + '/provider-led-registration/new-employer-user')
      } else {
        res.redirect('/' + version + '/provider-led-registration/index')
      }
    })


    

};

