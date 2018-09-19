var eteachBlocks = [
    {
      id: 'section', // id is mandatory
      label: '<h6>Section</h6>', // You can use HTML/SVG inside labels
      attributes: { class:'gjs-block-section hide' },
      content: `<section>
        <h1>This is a simple title</h1>
        <div>This is just a Lorem text: Lorem ipsum dolor sit amet</div>
      </section>`,
    }, 
    {
      id: 'text',
      label: '<h6>Text</h6>',
      attributes: { class:'hide' },
      content: '<div data-gjs-type="text">Insert your text here</div>',
    }, 
    {
      id: 'image',
      label: '<h6>Image</h6>',
      attributes: { class:'hide' },
      // Select the component once it's dropped
      select: true,
      // You can pass components as a JSON instead of a simple HTML string,
      // in this case we also use a defined component type `image`
      content: { type: 'image' },
      // This triggers `active` event on dropped components and the `image`
      // reacts by opening the AssetManager
      activate: true,
    }, 
    {
      id: 'socialMedia',
      label: `<h6>Social Media</h6>
              <div class="block-display">
                  <i class="fa fa-linkedin-square fa-5"></i>
                  <i class="fa fa-facebook-square fa-5"></i>                        
                  <i class="fa fa-twitter-square fa-5"></i>
              </div>`,
      content: `<div class="col-xs-12 col-md-4">
      <ul class="hidden-xs nav navbar-left navbar-nav socials">
        <li>
          <a target="_blank" href="{{site.linkedInUrl}}"><i class="fa fa-linkedin-square"></i>
          </a>
        </li>
        <li>
          <a target="_blank" href="{{site.facebookUrl}}"><i class="fa fa-facebook-square"></i>
          </a>
        </li>
        <li>
          <a target="_blank" href="{{site.twitterUrl}}"><i class="fa fa-twitter-square"></i>
          </a>
        </li>
      </ul>
    </div>`,
    },
    {
        id: 'mainTitle',
        label: `<h6>Main Title</h6>
              <div class="block-display">
                  <i class="fa fa-header fa-5" aria-hidden="true"></i>
              </div>`,
        content: '<h2>Main Title</h2>'
    },
    {
      id: 'subTitle',
      label: `<h6>Sub Title</h6>
              <div class="block-display">
                  <i class="fa fa-header fa-3" aria-hidden="true"></i>
              </div>`,
      content: '<h3>Sub Title</h3>'
      },
      {
          id: 'partners',
          label: `<h6>Partners</h6>                
              <div class="block-display">
                  <i class="fa fa-puzzle-piece fa-5" aria-hidden="true"></i>
              </div>`,
          attributes: { class:'gjs-block-section'},
          content: `<div class="component text-component" id="section-1126" data-name="Partners">
              <div class="container no-photo" data-gjs-draggable="false">
                  <h3 class="section-title" data-gjs-draggable="false">Part of the Two Counties Trust</h3>
                  <h4 class="section-subtitle" data-gjs-draggable="false">We have multiple locations around the country</h4>
                  <div class="text row" data-gjs-draggable="false">
                      <div class="body col-xs-12" data-gjs-draggable="false">
                      <div style="text-align: center;" data-gjs-draggable="false">
                      <a data-gjs-draggable="false" href="http://gloucesteracademy.careers.eteach.com"><img src="/images/gloucester-academy-logo.png" height="60px" hspace="10px" vspace="30"></a>
                      <a data-gjs-draggable="false" href="#"><img src="/images/Gagle-Brook-Primary-School-287x300.jpg" height="60px" hspace="10px" vspace="30"></a>
                      <a data-gjs-draggable="false" href="#"><img src="/images/nyland.jpg" height="60px" hspace="10px" vspace="30"></a>
                      <a data-gjs-draggable="false" href="#"><img src="/images/Southwold-logo-drawn-300x300.jpg" height="60px" hspace="10px" vspace="30"></a>
                      <a data-gjs-draggable="false" href="#"><img src="/images/croft.jpg" height="60px" hspace="10px" vspace="30"></a>
                      <a data-gjs-draggable="false" href="#"><img src="/images/tregoze-web.jpg" height="60px" hspace="10px" vspace="30"></a>
                      <a data-gjs-draggable="false" href="#"><img src="/images/ZOUCH-LOGO.png" height="60px" hspace="10px" vspace="30"></a>
                      </div>
                      
                      <div data-gjs-draggable="false" id="group__jobs"></div>
                      </div>
                  </div>
              </div>
          </div>`
      },
      {
          id: 'category',
          label: `<h6>Category</h6>                
              <div class="block-display">
                  <i class="fa fa-puzzle-piece fa-5" aria-hidden="true"></i>
              </div>`,
          attributes: { class:'gjs-block-section'},
          content: `<div class="component perks-component" id="section-3906" data-name="Category">
                      <div data-gjs-draggable="false" class="perks-background-image" style="background-image: url(/images/normal_photo_1515663110.jpg); background-color: white">
                          <div data-gjs-draggable="false" class="overlay" style="background-color: #222933; opacity: 0.6;"></div>
                          <div data-gjs-draggable="false" class="container">
                              <div data-gjs-draggable="false" class="row">
                              <div data-gjs-draggable="false" class="col-md-12">
                                  <h3 data-gjs-draggable="false" class="section-title">Category</h3>
                                  <h4 data-gjs-draggable="false" class="section-subtitle">A selection of what we have to offer</h4>
                              </div>
                              </div>
                              <div data-gjs-draggable="false" class="entry row row-centered">
                              <div data-gjs-draggable="false" class="col-md-4">
                                  <ul data-gjs-draggable="false">
                                  <li data-gjs-draggable="false">
                                      Fun
                                  </li>
                                  </ul>
                              </div>
                              <div class="col-md-4" data-gjs-draggable="false">
                                  <ul data-gjs-draggable="false">
                                  </ul>
                              </div>
                              <div data-gjs-draggable="false" class="col-md-4">
                                  <ul data-gjs-draggable="false">
                                  </ul>
                              </div>
                              </div>
                          </div>
                      </div>
                  </div>`
      },
      {
          id: 'jobs',
          label: `<h6>Jobs</h6>                
              <div class="block-display">
                  <i class="fa fa-puzzle-piece fa-5" aria-hidden="true"></i>
              </div>`,
          attributes: { class:'gjs-block-section'},
          content: `<div class="component offers-component" id="section-838" data-name="Jobs">
          <div data-gjs-draggable="false" class="container">
            <h3 data-gjs-draggable="false" class="section-title">Current open Vacancies at Ashfield School</h3>
            <h4 data-gjs-draggable="false" class="section-subtitle">Take a look below at our current openings, we would like to hear from you.</h4>
            <div data-gjs-draggable="false" class="filters-view">
              <div data-gjs-draggable="false" class="jobs-container" id="jobs-list">
                <div data-gjs-draggable="false" class="filters-container filters hidden-xs">
                  <div data-gjs-draggable="false" class="filter filter__search">
                    <input type="text" name="search" id="search-filter" class="search form-control" placeholder="Search...">
                  </div>
                  <div data-gjs-draggable="false" class="filter">
                    <select data-gjs-draggable="false" name="department" id="department" class="form-control"><option value="">All departments</option></select>
                  </div>
                  <div data-gjs-draggable="false" class="filter">
                    <select data-gjs-draggable="false" name="city" id="city" class="form-control"><option value="">All cities</option><option value="london">london</option></select>
                  </div>
                  <div data-gjs-draggable="false" class="filter filter__clear">
                    <a data-gjs-draggable="false" class="clear-filters" href="#">Clear</a>
                  </div>
                </div>
                <div data-gjs-draggable="false" class="list-container list">
                  <a data-gjs-draggable="false" class="job job__row" id="job-8726" href="/o/teach"><div class="job__column job__column--title">
                    <h5 data-gjs-draggable="false" class="title">teach</h5>
                  </div>
                  <div data-gjs-draggable="false" class="job__column job__column--meta">
                    <span data-gjs-draggable="false" class="location">
                      london
                    </span>
                  </div>
                  <div data-gjs-draggable="false" class="job-data hidden">
                    <div class="department"></div>
                    <div class="city">london</div>
                  </div>
                  </a>
                </div>
                <div data-gjs-draggable="false" class="empty-state hidden">
                  <h3 data-gjs-draggable="false">
                    No offers found
                  </h3>
                </div>
              </div>
            </div>
          </div>
          </div>`
      },
      {
          id: 'team',
          label: `<h6>Team</h6>                
              <div class="block-display">
                  <i class="fa fa-puzzle-piece fa-5" aria-hidden="true"></i>
              </div>`,
          attributes: { class:'gjs-block-section'},
          content: `<div class="component team-component" id="section-3904" data-name="Team">
          <div data-gjs-draggable="false" class="container">
            <h3 data-gjs-draggable="false" class="section-title">Our Team</h3>
            <h4 data-gjs-draggable="false" class="section-subtitle">The people behind our School</h4>
            <div data-gjs-draggable="false" class="members row">
              <div data-gjs-draggable="false" class="member col-md-2 col-sm-4 col-xs-6">
                <img data-gjs-draggable="false" class="img-circle" src="/images/thumb_avatar_1515662842.jpg" alt="Thumb avatar 1515662842">
                <div data-gjs-draggable="false" class="titles">
                  <div data-gjs-draggable="false" class="h5 truncate">mrs</div>
                  <div data-gjs-draggable="false" class="department truncate">teacher</div>
                </div>
              </div>
            </div>
          </div>
          </div>`
      },
      {
          id: 'perks',
          label: `<h6>Perks</h6>                
              <div class="block-display">
                  <i class="fa fa-puzzle-piece fa-5" aria-hidden="true"></i>
              </div>`,
          attributes: { class:'gjs-block-section'},
          content: `<div class="component perks-component" id="section-3905" data-name="Perks">
          <div data-gjs-draggable="false" class="perks-background-image">
            <div data-gjs-draggable="false" class="overlay" style="background-color: #222933; opacity: 0.6;"></div>
            <div data-gjs-draggable="false" class="container">
              <div data-gjs-draggable="false" class="row">
                <div data-gjs-draggable="false" class="col-md-12">
                  <h3 data-gjs-draggable="false" class="section-title">Perks & Benefits</h3>
                  <h4 data-gjs-draggable="false" class="section-subtitle">A selection of what we have to offer</h4>
                </div>
              </div>
              <div data-gjs-draggable="false" class="entry row row-centered">
                <div data-gjs-draggable="false" class="col-md-4">
                  <ul data-gjs-draggable="false">
                    <li data-gjs-draggable="false">
                      Car parking
                    </li>
                  </ul>
                </div>
                <div data-gjs-draggable="false" class="col-md-4">
                  <ul data-gjs-draggable="false">
                    <li data-gjs-draggable="false">
                      Money
                    </li>
                  </ul>
                </div>
                <div data-gjs-draggable="false" class="col-md-4">
                  <ul data-gjs-draggable="false">
                    <li data-gjs-draggable="false">
                      Fun
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          </div>`
      },
      {
          id: 'about',
          label: `<h6>About</h6>                
              <div class="block-display">
                  <i class="fa fa-puzzle-piece fa-5" aria-hidden="true"></i>
              </div>`,
          attributes: { class:'gjs-block-section'},
          content: `<div class="component text-component" id="section-1208" data-name="About">
          <div data-gjs-draggable="false" class="container no-photo">
            <h3 data-gjs-draggable="false" class="section-title">About us</h3>
            <h4 data-gjs-draggable="false" class="section-subtitle">What we stand for</h4>
            <div data-gjs-draggable="false" class="text row">
              <div data-gjs-draggable="false" class="body col-xs-12">
                <div data-gjs-draggable="false" id="one" style="border:0px solid red;">
                
                <a data-gjs-draggable="false" href="mailto:job.82l3m@acmeschool.schoolrecruiter.co.uk"><img src="/images/join-talent-pool-2.png" style="float:right; padding:20px;" alt="Join our Talent Pool" class=""></a>
                
                <h3 data-gjs-draggable="false">Welcome to ACME School</h3>
                
                <p data-gjs-draggable="false">ACME School is a school like no other.  Whether it is the smiles on the faces of our boys and girls, their zest for life, or their genuine desire to make the very best of themselves, it is obvious to any visitor that pupils here flourish.  As well they might, given the impressive buildings and grounds in which they live and learn.  But behind the stunning architecture lies a deep and genuine commitment to provide an education that is unsurpassed anywhere in the world.</p>
                
                <p data-gjs-draggable="false">ACME School is rightly known for high academic standards and outstanding examination results, but truly excellent education is about more than academic achievement alone.  It is about developing a passion for learning and a capacity for independent thinking.  We also expect pupils to develop moral values, acquire self-confidence without arrogance, and to discover genuine interests that extend beyond the classroom. Test</p>
                
                </div>
              </div>
            </div>
          </div>
          </div>`
      },
      {
          id: 'whywork',
          label: `<h6>Why Work</h6>                
              <div class="block-display">
                  <i class="fa fa-puzzle-piece fa-5" aria-hidden="true"></i>
              </div>`,
          attributes: { class:'gjs-block-section'},
          content: `<div class="component text-component" id="section-1180" data-name="Why Work">
          <div data-gjs-draggable="false" class="container no-photo">
            <h3 data-gjs-draggable="false" class="section-title">Why work at ACME School</h3>
            <h4 data-gjs-draggable="false" class="section-subtitle">Our benefits</h4>
            <div data-gjs-draggable="false" class="text row">
              <div data-gjs-draggable="false" class="body col-xs-12">
                <div data-gjs-draggable="false" class="careers__faqs">
                <ul data-gjs-draggable="false" class="faqs">
                    <li data-gjs-draggable="false" class="faqs__item">
                        <img src="/images/culture.gif" alt="" class="faqs__icon">
                        <h3 class="faqs__title">Great culture</h3>
                        <p class="faqs__description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In diam velit, auctor eget leo sed, faucibus consequat erat.</p>
                    </li>
                    <li data-gjs-draggable="false" class="faqs__item">
                        <img src="/images/locations.gif" alt="" class="faqs__icon">
                        <h3 class="faqs__title">Multi locations</h3>
                        <p class="faqs__description">Quisque et placerat velit. Pellentesque suscipit, ex quis facilisis pulvinar, risus turpis hendrerit purus, et tempor lorem nisi in sem.</p>
                    </li>
                    <li data-gjs-draggable="false" class="faqs__item">
                        <img src="/images/flexible.gif" alt="" class="faqs__icon">
                        <h3 class="faqs__title">Flexible working hours</h3>
                        <p class="faqs__description">Quisque et placerat velit. Pellentesque suscipit, ex quis facilisis pulvinar, risus turpis hendrerit purus, et tempor lorem nisi in sem.</p>
                    </li>
                    <li data-gjs-draggable="false" class="faqs__item">
                        <img src="/images/holiday.gif" alt="" class="faqs__icon">
                        <h3 class="faqs__title">24 days of holiday</h3>
                        <p class="faqs__description">Quisque et placerat velit. Pellentesque suscipit, ex quis facilisis pulvinar, risus turpis hendrerit purus, et tempor lorem nisi in sem.</p>
                    </li>
                    <li data-gjs-draggable="false" class="faqs__item">
                        <img src="/images/health.gif" alt="" class="faqs__icon">
                        <h3 class="faqs__title">Private health insurance</h3>
                        <p class="faqs__description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In diam velit, auctor eget leo sed, faucibus consequat erat.</p>
                    </li>
                    <li data-gjs-draggable="false" class="faqs__item">
                        <img src="/images/gym.gif" alt="" class="faqs__icon">
                        <h3 class="faqs__title">Discounted gym access</h3>
                        <p class="faqs__description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In diam velit, auctor eget leo sed, faucibus consequat erat.</p>
                    </li>
                </ul>
                </div>
              </div>
            </div>
          </div>
          </div>`
      },
      {
          id: 'ourschool',
          label: `<h6>Our School</h6>                
              <div class="block-display">
                  <i class="fa fa-puzzle-piece fa-5" aria-hidden="true"></i>
              </div>`,
          attributes: { class:'gjs-block-section'},
          content: {
            content: `<div class="component gallery-component" id="section-1058"  data-name="Our School">
                <div data-gjs-draggable="false" class="container">
                <div data-gjs-draggable="false" class="row">
                    <div data-gjs-draggable="false" class="col-md-12">
                    <h3 data-gjs-draggable="false" class="section-title">Our School</h3>
                    <h4 data-gjs-draggable="false" class="section-subtitle">A great place to work</h4>
                    </div>
                </div>
                </div>
                <div data-gjs-draggable="false" class="gallery-carousel">
                <div data-gjs-draggable="false" class="photo">
                    <img data-gjs-draggable="false" height="254" src="/images/normal_photo_1470129739.JPG" alt="Normal photo 1470129739">
                </div>
                <div data-gjs-draggable="false" class="photo">
                    <img data-gjs-draggable="false" height="254" src="/images/normal_photo_1470129745.jpg" alt="Normal photo 1470129745">
                </div>
                <div data-gjs-draggable="false" class="photo">
                    <img data-gjs-draggable="false" height="254" src="/images/normal_photo_1470129741.jpg" alt="Normal photo 1470129741">
                </div>
                <div data-gjs-draggable="false" class="photo">
                    <img data-gjs-draggable="false" height="254" src="/images/normal_photo_1470129744.jpg" alt="Normal photo 1470129744">
                </div>
                <div class="photo">
                    <img height="254" src="/images/normal_photo_1470129743.jpg" alt="Normal photo 1470129743">
                </div>
                <div data-gjs-draggable="false" class="photo">
                    <img data-gjs-draggable="false" height="254" src="/images/normal_photo_1470129740.jpg" alt="Normal photo 1470129740">
                </div>
                <div data-gjs-draggable="false" class="photo">
                    <img data-gjs-draggable="false" height="254" src="/images/normal_photo_1470129738.jpg" alt="Normal photo 1470129738">
                </div>
                </div>
                </div>`,
    
            script: function(){
                $(".gallery-component .gallery-carousel:not(.slick-initialized)").slick({
                    slidesToScroll: 1,
                    infinite: !0,
                    centerMode: !0,
                    variableWidth: !0,
                    adaptiveHeight: false
                });
            }
        }   
      },
      {
          id: 'location',
          label: `<h6>Location</h6>                
              <div class="block-display">
                  <i class="fa fa-puzzle-piece fa-5" aria-hidden="true"></i>
              </div>`,
          attributes: { class:'gjs-block-section'},
          content: `<div class="component map-component" id="section-1057" data-name="Location">
          <div data-gjs-draggable="false" class="container">
            <h3 data-gjs-draggable="false" class="section-title">Location</h3>
            <h4 data-gjs-draggable="false" class="section-subtitle">Street, City</h4>
          </div>
          <div data-gjs-draggable="false" class="map-holder" id="map-component-1057"></div>
          <div data-gjs-draggable="false" class="markers">
            <div data-gjs-draggable="false" class="marker" data-lat="51.4502669" data-lng="-0.573086200000034" data-title="ACME School">
              <h5 data-gjs-draggable="false">ACME School</h5>
              <div data-gjs-draggable="false" class="content"><p>Burfield Road, Old Windsor, Berkshire, SL4 2JJ, UK</p></div>
            </div>
          </div>
          </div>`
      },
      {
          id: 'videos',
          label: `<h6>Videos</h6>                
              <div class="block-display">
                  <i class="fa fa-puzzle-piece fa-5" aria-hidden="true"></i>
              </div>`,
          attributes: { class:'gjs-block-section'},
          content: `<div class="component videos-component" id="section-3908" data-name="Videos">
          <div data-gjs-draggable="false" class="container">
            <h3 data-gjs-draggable="false" class="section-title">Videos</h3>
            <h4 data-gjs-draggable="false" class="section-subtitle">A great place to work</h4>
            <div data-gjs-draggable="false" class="videos row">
              <div data-gjs-draggable="false" class="col-md-6">
                <div data-gjs-draggable="false" class="video-wrapper">
                  <iframe data-gjs-draggable="false" allowfullscreen="allowfullscreen" class="youtube" frameborder="0" height="360" src="https://youtu.be/mN-mKXkNyEk" width="640"></iframe>
                </div>
              </div>
            </div>
          </div>
          </div>`
      },
      {
          id: 'feedback',
          label: `<h6>Feedback</h6>                
              <div class="block-display">
                  <i class="fa fa-puzzle-piece fa-5" aria-hidden="true"></i>
              </div>`,
          attributes: { class:'gjs-block-section'},
          content: `<div class="component quote-component" id="section-3907" data-name="Feedback">
          <div data-gjs-draggable="false" class="container">
            <div data-gjs-draggable="false" class="entry">
              <p data-gjs-draggable="false">It's great working with you!</p>
            </div>
            <div data-gjs-draggable="false" class="row row-centered">
              <div class="member">
                <div data-gjs-draggable="false" class="col-md-2 col-centered xs-hidden">
                  <div data-gjs-draggable="false" class="avatar">
                    <img data-gjs-draggable="false" class="img-circle" src="/images/thumb_photo_1515663314.jpg" alt="Thumb photo 1515663314">
                  </div>
                </div>
                <div data-gjs-draggable="false" class="col-md-2 col-centered">
                  <div data-gjs-draggable="false" class="titles">
                    <div data-gjs-draggable="false" class="h5">John Doe</div>
                    <div data-gjs-draggable="false" class="department">CEO, Acme</div>
                  </div>
                </div>
              </div>
            </div>
          </div>`
      },      
      {
        id: 'default-map',
        label: `<h6>Default Map</h6>                
        <div class="block-display">
            <i class="fa fa-map-marker fa-5" aria-hidden="true"></i>
        </div>`,
        content: {
          type: 'map', // Built-in 'map' component
          style: {
            height: '400px'
          },
          removable: false, // Once inserted it can't be removed
        }
      },
      {
        id: 'search',
        label: `<h6>Search</h6>                
            <div class="block-display">
                <i class="fa fa-puzzle-piece fa-5" aria-hidden="true"></i>
            </div>`,
        attributes: { class:'gjs-block-section'},
        content: `<div class="component offers-component" id="section-838" data-name="Jobs">
        <div data-gjs-draggable="false" class="container">
          <h3 data-gjs-draggable="false" class="section-title">Search</h3>
          <h4 data-gjs-draggable="false" class="section-subtitle">Lipsum dolor sit amet</h4>
          <div data-gjs-draggable="false" class="filters-view">
            <div data-gjs-draggable="false" class="jobs-container" id="jobs-list">
              <div data-gjs-draggable="false" class="filters-container filters hidden-xs">
                <div data-gjs-draggable="false" class="filter filter__search">
                  <input type="text" name="search" id="search-filter" class="search form-control" placeholder="Search...">
                </div>                
                <div data-gjs-draggable="false" class="filter filter__clear search-button-holder">
                  <button data-gjs-draggable="false" type="button" class="btn btn-primary">Search</button>
                </div>
              </div>
              
              <div data-gjs-draggable="false" class="empty-state" id="search-result">
                <h3 data-gjs-draggable="false">
                  Search result
                </h3>
              </div>
            </div>
          </div>
        </div>
        </div>`
      },
      {
        id: 'news',
        label: `<h6>News</h6>                
            <div class="block-display">
                <i class="fa fa-puzzle-piece fa-5" aria-hidden="true"></i>
            </div>`,
        attributes: { class:'gjs-block-section'},
        content: `<div class="component offers-component offers-component" id="section-838" data-name="Jobs">
        <div data-gjs-draggable="false" class="container">
          <h3 data-gjs-draggable="false" class="section-title">News</h3>
          <h4 data-gjs-draggable="false" class="section-subtitle">Lipsum dolor sit amet</h4>
          <div data-gjs-draggable="false" class="filters-view">
            <div data-gjs-draggable="false" class="jobs-container" id="news-list"> 
              <div data-gjs-draggable="false" class="empty-state" id="search-result">
              <div class="text row" data-gjs-draggable="false">
              <div class="photo col-md-2" data-gjs-draggable="false">
              <a href="#">
              <img class="img-fluid rounded mb-3 mb-md-0" src="http://placehold.it/180x120" alt="">
            </a>
              </div>
              <div class="body col-md-10" data-gjs-draggable="false">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea 
                commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
                velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint 
                occaecat cupidatat non proident, sunt in culpa qui officia deserunt 
                mollit anim id est laborum. <a class="btn btn-link" href="#">read more</a></p>
              </div>
            </div>
            </div>
              </div>
            </div>
          </div>
        </div>
        </div>`
      }
  ]