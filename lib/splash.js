import dom from 'vd'

export default function splash ({ path, name, org, coc, logo, active, total, channels, large, iframe, gcaptcha_sitekey }){
  let div = dom('',
    !iframe && dom('.u-background-50.u-position-relative',
      dom('.header-container', 
        dom('.header-logo',
          dom('a href="https://developers.italia.it/"',
            dom('img src="https://developers.italia.it/assets/icons/logo-it.png" alt="Developers Italia logo"')
          )
        ),
        dom('.header-title',
          dom('h1.header-titleLink',
            dom('a href="https://developers.italia.it/"', '/developers',
              dom('span.beta', 'beta'),
              dom('br'),
              dom('small','La comunità italiana degli sviluppatori di servizi pubblici')
            )
          )
        )
      ),
      dom('hr.separator-room'),
      dom('hr.separator.separator--up.u-background-white.u-position-relative')
    ),
    dom('.u-background-white.u-position-relative',
      dom('.splash.u-background-white.u-position-relative',
        !iframe && dom('.logos',
          logo && dom('.logo.org'),
          dom('.logo.slack')
        ),
        dom('p',
          'Unisciti a ', dom('b', name),
          // mention single single-channel inline
          channels && channels.length === 1 && dom('span', ' #', channels[0]),
          ' su Slack.'
        ),
        dom('p.status',
          active
            ? [
              'Ci sono ',
              dom('b.active', active), ' utenti online su ',
              dom('b.total', total), ' registrati.'
            ]
            : [dom('b.total', total), ' utenti registrati.']
        ),
        dom('form id=invite',
          channels && (
            channels.length > 1
              // channel selection when there are multiple
              ? dom('select.form-item name=channel',
                  channels.map(channel => {
                    return dom('option', { value: channel, text: channel })
                  })
                )
              // otherwise a fixed channel
              : dom('input type=hidden name=channel', { value: channels[0] })
          ),
          dom('input.form-item type=email name=email placeholder=you@yourdomain.com '
            + (!iframe ? 'autofocus' : '')),
          dom('br'),
          dom(`div class="g-recaptcha" data-sitekey="${gcaptcha_sitekey}"`),
          coc && dom('.coc',
            dom('label',
              dom('input type=checkbox name=coc value=1'),
              'Accetto la ',
              dom('a', { href: coc, target: '_blank' }, 'Code of Conduct'),
              '.'
            )
          ),
          dom('button.loading', 'Procedi')
        ),
        dom('p.signin',
          'oppure ',
          dom(`a href=https://${org}.slack.com target=_top`, 'accedi'),
          '.'
        ),
        !iframe && dom('footer',
          'powered by ',
          dom('a href=http://rauchg.com/slackin target=_blank', 'slackin')
        )
      )
    ),
    style({ logo, active, large, iframe }),
    // xxx: single build
    dom('script', `
      data = {};
      data.path = ${JSON.stringify(path)};
    `),
    dom('script src=https://cdn.socket.io/socket.io-1.4.4.js'),
    dom(`script src=${path}assets/superagent.js`),
    dom(`script src=${path}assets/client.js`),
    dom(`script src=${path}assets/superagent.js`)
  )
  return div
}

const pink = '#E01563'
const blue = '#06c'

function style ({ logo, active, large, iframe } = {}){
  var css = dom.style()
  css.add('html', { 'font-size': large ? '14px' : '10px' })

  css.add('.splash', {
    'margin': iframe ? '0' : '0 auto',
    'text-align': 'center',
    'font-family': '"Titillium Web", Helvetica, Arial, sans-serif'
  })

  if (iframe) {
    css.add('body, html', {
      'margin': '0',
      'padding': '0',
      'background': '#FAFAFA',
      'overflow': 'hidden' // ff
    })

    css.add('.splash', {
      'box-sizing': 'border-box',
      'padding': '1rem'
    })
  }

  css.add('.head', {
    'margin-bottom': '4rem'
  })

  css.add('.logos', {
    'position': 'relative',
    'margin-bottom': '4rem'
  })

  if (!iframe) {
    css.add('.logo', {
      'width': '4.8rem',
      'height': '4.8rem',
      'display': 'inline-block',
      'background-size': 'cover'
    })

    css.add('.logo.slack', {
      'background-image': 'url(assets/slack.svg)'
    })

    if (logo) {
      let pw = 1 // '+' width in rem
      let lp = 3 // logos separation in rem

      css.add('.logo.org::after', {
        'position': 'absolute',
        'display': 'block',
        'content': '"+"',
        'top': '1.5rem',
        'left': '0',
        'width': '30rem',
        'text-align': 'center',
        'color': '#D6D6D6',
        'font-size': '1.5rem', // can't use rem in font shorthand IE9-10
              // http://codersblock.com/blog/font-shorthand-bug-in-ie10/
        'font-family': '"Titillium Web", Helvetica, Arial, sans-serif'
      })

      css.add('.logo.org', {
        'background-image': `url(${logo})`,
        'margin-right': `${lp + pw + lp}rem`
      })
    }
  }

  css.add('.coc', {
    'font-size': '1.2rem',
    padding: '1.5rem 0 .5rem',
    color: '#666'
  })

  if (iframe) {
    css.add('.coc', {
      'font-size': '1.1rem',
      'padding-top': '1rem'
    })

    css.add('.coc input', {
      position: 'relative',
      top: '-.2rem'
    })
  }

  css.add('.coc label', {
    cursor: 'pointer'
  })

  css.add('.coc input', {
    'appearance': 'none',
    '-webkit-appearance': 'none',
    border: 'none',
    'vertical-align': 'middle',
    margin: '0 .5rem 0 0'
  })

  css.add('.coc input::after', {
    content: '""',
    display: 'inline-block',
    width: '1.5rem',
    height: '1.5rem',
    'vertical-align': 'middle',
    background: 'url(/assets/checkbox.svg)',
    cursor: 'pointer'
  })

  css.add('.coc input:checked::after', {
    'background-position': 'right'
  })

  css.add('.coc a', {
    color: '#666'
  })

  css.add('.coc a:hover', {
    'background-color': '#666',
    'text-decoration': 'none',
    color: '#fff'
  })

  css.add('p', {
    'font-size': iframe ? '1.2rem' : '1.5rem',
    'margin': iframe ? '0 0 .5rem' : '.5rem 0'
  })

  if (iframe) {
    css.add('p.status', {
      'font-size': '1.1rem'
    })
  }

  css.add('select', {
    'background': 'none'
  })

  css.add('button, .form-item', {
    'font-size': '1.6rem',
    'margin-top': iframe ? '.5rem' : '1rem',
    'vertical-align': 'middle',
    'display': 'block',
    'text-align': 'center',
    'box-sizing': 'border-box',
    'width': '100%',
    'padding': '1.4rem',
    'font-family': '"Titillium Web", Helvetica, Arial, sans-serif'
  })

  css.add('button', {
    'color': '#fff',
    'font-weight': 'bold',
    'border-width': 0,
    'background': blue,
    'text-transform': 'uppercase',
    'cursor': 'pointer',
    'appearence': 'none',
    '-webkit-appearence': 'none',
    'outline': '0',
    'transition': 'background-color 150ms ease-in, color 150ms ease-in',
    'border-radius': '0'
  })

  css.add('button.loading', {
    'pointer-events': 'none'
  })

  css.add('button:disabled', {
    'color': '#9B9B9B',
    'background-color': '#D6D6D6',
    'cursor': 'default',
    'pointer-events': 'none'
  })

  css.add('button.error', {
    'background-color': '#F83E5A',
    'text-transform': 'none'
  })

  css.add('button.success:disabled', {
    'color': '#fff',
    'background-color': '#00CF86'
  })

  css.add('button:not(.disabled):active', {
    'background-color': '#7A002F'
  })

  css.add('b', {
    'transition': 'transform 150ms ease-in'
  })

  css.add('b.grow', {
    'transform': 'scale(1.3)'
  })

  css.add('form', {
    'margin-top': iframe ? '1rem' : '2rem',
    'margin-bottom': '0'
  })

  css.add('input', {
    'color': '#9B9B9B',
    'border': '.1rem solid #D6D6D6'
  })

  if (iframe) {
    css.add('button, .form-item', {
      'height': '2.8rem',
      'line-height': '2.8rem',
      'padding': 0,
      'font-size': '1.1rem'
    })
  }

  css.add('input:focus', {
    'color': '#666',
    'border-color': '#999',
    'outline': '0'
  })

  if (active) {
    css.add('.active', {
      'color': blue
    })
  }

  css.add('p.signin', {
    'padding': '1rem 0 1rem',
    'font-size': '1.1rem'
  })

  css.add('p.signin a', {
    'color': blue,
    'text-decoration': 'none'
  })

  css.add('p.signin a:hover', {
    'background-color': '#06c',
    color: '#fff'
  })

  if (!iframe) {
    css.add('footer', {
      'color': '#D6D6D6',
      'font-size': '1.1rem',
      'margin': '6rem auto 0',
      'width': '30rem',
      'text-align': 'center'
    })

    css.add('footer a', {
      'color': '#9B9B9B',
      'text-decoration': 'none',
      'border-bottom': '.1rem solid #9B9B9B'
    })

    css.add('footer a:hover', {
      'color': '#fff',
      'background-color': '#9B9B9B'
    })
  }

  return css
}
