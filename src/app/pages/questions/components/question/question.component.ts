import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild
} from '@angular/core'
import { Dialogs } from '@ionic-native/dialogs/ngx'
import { Vibration } from '@ionic-native/vibration/ngx'
import { Content, Keyboard } from 'ionic-angular'
import * as smoothscroll from 'smoothscroll-polyfill'

import { Answer } from '../../../../shared/models/answer'
import { Question, QuestionType } from '../../../../shared/models/question'
import {Task} from "../../../../shared/models/task";

@Component({
  selector: 'question',
  templateUrl: 'question.component.html',
})
export class QuestionComponent implements OnInit, OnChanges {
  @ViewChild('content') content
  @ViewChild('input') input

  @Input()
  question: Question
  @Input()
  questionIndex: number
  @Input()
  currentIndex: number
  @Input()
  task: Task
  @Input()
  isSectionHeaderHidden: boolean
  @Output()
  answer: EventEmitter<Answer> = new EventEmitter<Answer>()

  value: any
  currentlyShown = false
  previouslyShown = false
  isLoading = true
  isScrollable = false
  isFieldLabelHidden = false
  margin = 32
  keyboardScrollPadding = 200
  keyboardInputOffset = 0
  inputHeight = 0
  isMatrix = false

  NON_SCROLLABLE_SET: Set<QuestionType> = new Set([
    QuestionType.timed,
    QuestionType.audio,
    QuestionType.info,
    QuestionType.text
  ])
  HIDE_FIELD_LABEL_SET: Set<QuestionType> = new Set([QuestionType.audio])
  MATRIX_INPUT_SET: Set<QuestionType> = new Set([QuestionType.matrix_radio])

  constructor(
    private vibration: Vibration,
    private dialogs: Dialogs,
    private keyboard: Keyboard
  ) {
    smoothscroll.polyfill()
    this.value = null
  }

  ngOnInit() {
    this.isScrollable = !this.NON_SCROLLABLE_SET.has(this.question.field_type)
    this.isFieldLabelHidden = this.HIDE_FIELD_LABEL_SET.has(
      this.question.field_type
    )
    this.isMatrix = this.MATRIX_INPUT_SET.has(this.question.field_type)
    setTimeout(() => {
      this.isLoading = false
      this.keyboardInputOffset = Math.max(
        this.input.nativeElement.offsetTop - this.keyboardScrollPadding,
        0
      )
    }, 800)
  }

  ngOnChanges() {
    this.initRange()
    if (this.questionIndex === this.currentIndex) {
      this.currentlyShown = true
    } else {
      if (Math.abs(this.questionIndex - this.currentIndex) == 1)
        this.previouslyShown = true
      else this.previouslyShown = false
      this.currentlyShown = false
    }
    // this.evalBeep()
  }

  emitAnswer() {
    this.answer.emit({
      id: this.question.field_name,
      value: this.value,
      type: this.question.field_type
    })
  }

  onValueChange(event: any) {
    // NOTE: On init the component fires the event once
    if (event === undefined) {
      return
    }
    this.value = event
    this.emitAnswer()
  }

  evalBeep() {
    if (this.currentlyShown && this.question.field_label.includes('beep')) {
      console.log('Beep!')
      this.dialogs.beep(1)
      this.vibration.vibrate(600)
    }
  }

  initRange() {
    if (
      this.question.select_choices_or_calculations &&
      this.question.select_choices_or_calculations.length > 0
    ) {
      const min = this.question.select_choices_or_calculations[0].code
      const minLabel = this.question.select_choices_or_calculations[0].label
      const max = this.question.select_choices_or_calculations[
        this.question.select_choices_or_calculations.length - 1
      ].code
      const maxLabel = this.question.select_choices_or_calculations[
        this.question.select_choices_or_calculations.length - 1
      ].label
      this.question.range = {
        min: parseInt(min.trim()),
        max: parseInt(max.trim()),
        labelLeft: minLabel.trim(),
        labelRight: maxLabel.trim()
      }
    }
  }

  onTextInputFocus(value) {
    if (value) {
      // Add delay for keyboard to show up
      setTimeout(() => {
        this.content.nativeElement.style = `padding-bottom:${this.keyboardInputOffset}px;`
        this.content.nativeElement.scrollTop = this.keyboardInputOffset
      }, 100)
    } else {
      this.content.nativeElement.style = ''
      this.content.nativeElement.scrollTop = 0
    }
  }
}
