import {
  render,
  html,
  svg
} from 'lighterhtml'

class Faq {
  constructor (customOptions) {
    const defaultOptions = {
      i18n: {
        locale: 'en-US',
        rtl: 'ltr',
        translations: {
          'en-US': {
            questionField: {
              placeholder: 'Question...'
            },

            answerField: {
              placeholder: 'Answer...'
            }
          }
        }
      },
      controllers: [

      ]
    }

    this.options = {
      ...defaultOptions,
      ...customOptions
    }
  }

  renderSubBlock (i18n, savedData) {
    const textDirection = (i18n.rtl !== undefined) ? i18n.rtl : this.options.i18n.rtl

    return html.node`<p class="question-field" contenteditable data-placeholder="${this.options.i18n.translations[this.options.i18n.locale].questionField.placeholder}" dir="${textDirection}"></p>
        <p class="answer-field" contenteditable data-placeholder="${this.options.i18n.translations[this.options.i18n.locale].answerField.placeholder}" dir="${textDirection}"></p>`
  }

  render (i18n, savedData) {
    return html.node`<div class="freedom-editor-blocks ${this.constructor.name}-block" data-block-type="${this.constructor.name}" data-allow-sub-block="true">
      ${this.renderSubBlock(i18n, savedData)}
    </div>`
  }

  save (block) {
    const questionFieldsData = block.querySelectorAll('.question-field')
      .map((questionField) => {
        return questionField.textContent
      })
    const answerFieldsData = block.querySelectorAll('.answer-field')
      .map((answerField) => {
        return answerField.textContent
      })

    const data = questionFieldsData.map((questionText, index) => {
      if (questionText === '' && answerFieldsData[index] === '') {
        return
      }

      return {
        question: questionText,
        answer: answerFieldsData[index]
      }
    })

    return {
      type: 'faq',
      data: data
    }
  }
};

export {
  Faq
}
