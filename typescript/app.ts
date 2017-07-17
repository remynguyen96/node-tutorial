// String
let demo_string: string = "This is string !!!"

// Number
let demo_number: number = 123213213

// Boolean
let bool: boolean = true

// array, string array
let str_array: string[] = ['one','two','three']
// array, number array
let number_array: number[] = ['1','2','3','4']

// Enum
enum Color {Red, Black, Blue};
let key: Color = Color.Black //(get ket in array )
let value: string = Color[2]; //(get value in array )

// Object
let obj: any = {
    childObj:{
        typesrcipt: 'started',
        angular2: 'part1',
        grandchildObj:{
            ionic: 'part2'
        }
    }
}

function notReturn(): void{
    console.log('Not found return !!!');
}

notReturn();
