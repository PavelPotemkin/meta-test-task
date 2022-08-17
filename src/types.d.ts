interface ApiResponse {
    "submit": string
    pages: Page[]
    "intermediarySubmit": string
    "therapistCount": number
}

type Page = {
    questions: InputQuestion[],    // массив со списком вопросов на шаге
    conditional?: Conditional // опциональный Conditional - решаем,
    // показывать ли пользователю этот шаг,
    // либо пропускать его
}

interface Question { // поля, которые есть у каждого Question
    key: string        // ключ в состоянии, куда пишется значение,
    // выбранное пользователем

    label: string      // название вопроса, показываемое пользователю
    type: string       // тип вопроса, в дальнейших типах будут конкретизированы

    required?: boolean  // обязателен ли заполненный вопрос для перехода
                        // на следующий шаг

    conditional?: Conditional // условие для проверки - показываем и
                              // валидируем ли мы вопрос

    // если условие отсутствует - показываем и
    // валидируем всегда
}

interface RadioQuestion extends Question {
    // вопрос с радиокнопкой - один вариант из нескольких
    type: 'radio'
    values: {        // массив возможных вариантов
        label: string  // название варианта, отображаемое пользователю
        value: string  // значение варианта, записываемое в состояние под ключом **key**
    }[]
}

interface TextFieldQuestion extends Question {
    // текстовое поле ввода
    type: 'textfield'
}

interface CheckboxQuestion extends Question {
    type: 'checkbox'
}

interface MultiselectQuestion extends Question {
    type: 'multiselect',
    values: string | {
        label: string  // название варианта, отображаемое пользователю
        value: string  // значение варианта, записываемое в состояние под ключом **key**
    }[]

    maxChoices?: number // если maxChoices присутствует, то не давать пользователю
                        // выбирать больше maxChoices значений
}

type SubmitResponse = {
    success: boolean
}

type Conditional = {
    fn: 'eq' | 'neq' | 'gt'
    when: string
    arg: string | number
}

type IntermediarySubmitResponse = {
    success: boolean,
    therapistCount: number // число терапевтов, которые готовы ответить на запрос
}

type InputQuestion = RadioQuestion | TextFieldQuestion | CheckboxQuestion | MultiselectQuestion