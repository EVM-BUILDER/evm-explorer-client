const { get } = require('lodash')

function getRootStyle(settings = {}) {
  return `
  * {
    font-family: "${get(settings, 'appearance.typography.fontfamily', 'Roboto')}";
  }

  :root{
    --menu-height: 54px;

    --primary: ${get(settings, 'appearance.color_scheme.primary')};
    --secondary: ${get(settings, 'appearance.color_scheme.secondary')};
    --tertiary: ${get(settings, 'appearance.color_scheme.tertiary')};

    --header-bg: ${get(settings, 'appearance.header.bgcolor')};
    --header-bg-subnav: ${get(settings, 'appearance.header.subnav_bg_color')};
    --header-color: ${get(settings, 'appearance.header.textcolor')};
    --subheader-color: ${get(settings, 'appearance.header.subtextcolor')};
    --header-active-color: ${get(settings, 'appearance.header.text_active_color')};
    --header-font-size: ${get(settings, 'appearance.header.fontsize')}px;
    --header-font-weight: ${get(settings, 'appearance.header.fontweight')};    
    
    --header-search-color: ${get(settings, 'appearance.homesearch.color')};
    --header-search-bg-color: ${get(settings, 'appearance.homesearch.bgcolor')};
    --header-search-border-color: ${get(settings, 'appearance.homesearch.bordercolor')};

    --banner-bg-color: ${get(settings, 'appearance.banner.bgcolor')};
    --banner-bg-image: url(${get(settings, 'appearance.banner.bgimage')});

    --footer-bg: ${get(settings, 'appearance.footer.bgcolor')};
    --footer-bg-image: url(${get(settings, 'appearance.footer.bgimage')});
    --footer-color: ${get(settings, 'appearance.footer.textcolor')};
    --footer-active-color: ${get(settings, 'appearance.footer.text_active_color')};
    --footer-font-size: ${get(settings, 'appearance.footer.fontsize')}px;
    --footer-font-weight: ${get(settings, 'appearance.footer.fontweight')};

    --card-header-bgcolor: ${get(settings, 'appearance.card.header_bg_color')};
    --card-body-bgcolor: ${get(settings, 'appearance.card.body_bg_color')};
    
    --table-header-bgcolor: ${get(settings, 'appearance.table.header_bg_color')};
    --table-body-bgcolor: ${get(settings, 'appearance.table.body_bg_color')};

    --text: ${get(settings, 'appearance.text')};
    --text-header: #4a4f55; 
    --text-span: #77838f;
  
    --link-color: ${get(settings, 'appearance.footer.fontsize')}px;
  
    --white-color: white;
    --black-color: #1e2022;
    --color-header-fill: rgba(93, 101, 136, 1);
    --color-padding: #3498db;
    --success: #31d0aa;
    --failure: #ff4d4f;
    --warning: #ff4d4f;
  
    --red: #de4437;
    --green: green;
    --orange: #b47d00;
    --white: #ffffff;
    --orange-bg: #db9a0433;
    --green-stick: #00c9a7;
    --border-color: ${get(settings, 'appearance.bordercolor')};
    --border-color-hover: #414768;
    --border-color-footer: 0.2px solid #e7eaf324;
    --border-dark: #1e004f;
  
    --primary-bg-hover: #651fda;
    --primary-border-hover: #601dcf;
  
    --background-body: ${get(settings, 'appearance.body.bgcolor')};
    --background-color: #3c3a3a;
    --background-wrapper: #f8f9fa;
    --background-color-dark: rgba(47, 50, 65, 0.5);
    --background-button-dard: rgba(119, 131, 143, 0.1);
    --background-card: #1e1f25;
    --background-color-badge: rgba(119, 131, 143, 0.1);
    --background-color-padding: rgba(130, 71, 229, 0.1);
    --background-color-padding-light: #3498db1a;
    --background-rgba: rgba(248, 249, 250, 0.4);
    --background-span: #eeeeee;
    --background-slogan: #77838f0d;
    --background-button-dark: hsla(0, 0%, 100%, 0.2);
    --background-item: rgba(52, 152, 219, 0.1);
    --background-item-hover: #3498db;
  
    --color-shadow: rgba(189, 197, 209, 20%);
    --color-shadow2: 0 4px 11px rgba(248, 249, 250, 35%);
    --color-shadow-account: 0 4px 11px rgba(130, 71, 229, 35%);
    --color-shadow-header-li: 0 8px 20px rgba(130, 71, 229, 8%);
  }`
}

export default getRootStyle
