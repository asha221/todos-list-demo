import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ITodo } from '../../interface/todo';

import { ICategory } from '../../interface/category';
import { ITag } from '../../interface/tag';
import { TodoService } from '../todo.service';
import { forkJoin, Observable } from 'rxjs';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-add-edit-todo',
  templateUrl: './add-edit-todo.component.html',
  styleUrls: ['./add-edit-todo.component.css']
})
export class AddEditTodoComponent implements OnInit {

  isEdit: any;
  todoForm: FormGroup | any;
  categories: ICategory[]=[];
  tags: ITag[]=[];
  isFormLoading: boolean = false;
  currentDate: Date = new Date();
  todo = {
    _id: '',
    title: '',
    isCompleted: false,
    targetDate: { 
      year: this.currentDate.getFullYear(), 
      month: this.currentDate.getMonth()+1,
      // month starts with 0 index so we are adding +1
      day: this.currentDate.getDate()
    } as NgbDateStruct,
    // the above format is done by  NgbDateStruct interface 
    tags: [],
    category: ''
  };
  errorMessage: string = '';

  constructor(private route: ActivatedRoute, 
              private fb: FormBuilder, 
              private todoService: TodoService,
              private router: Router) { }

  ngOnInit() {
    this.todoForm = this.fb.group({
      title: [this.todo.title, [Validators.required, Validators.minLength(5)]],
      isCompleted: [this.todo.isCompleted],
      targetDate: [this.todo.targetDate, Validators.required],
      tags: this.fb.array([]),
      category: [this.todo.category, Validators.required]
    });

    this.todoForm.valueChanges.subscribe(
      (      values: any) => console.log(values)
    );
    
    this.route.paramMap.subscribe(
      // if we subscribe to this.route.paramMap we will get the id 
      (params:any) => {
        this.todo._id = params.get('id');
        if(this.todo._id === '0' || !this.todo._id) {
          //  id=0 is for save !this.todo._id is for edit
          this.isEdit = false;
        } else {
          this.isEdit = true;
        }
      }
    );
    
    let categories$ = this.todoService.getCategories();  
    let tags$ = this.todoService.getTags();  
    let todo$ = this.todoService.getTodo(this.todo._id);  
    let restCalls: Array<Observable<any>> = [categories$, tags$];
      // in the case of edit restCalls have 3 observables categories$, tags$,todo$
      // in the case of add restCalls have 2 observables categories$, tags$ because here we don't need id  of todo
    if(this.isEdit) {
      restCalls.push(todo$);
    }

    this.isFormLoading = true;
    forkJoin(restCalls).subscribe(
      // forkJoin() method is used to handle multiple calls at one time
      ([categories, tags, todo]) => {
        this.isFormLoading = false;
        this.categories = categories;
        this.tags = tags;
        this.buildTagControls();
        if(this.isEdit) {
          this.formatTodo(todo as ITodo);
          this.todoForm.patchValue(this.todo);
          this.updateTagControls(todo.tags);
        }
      },
      error => {
        console.log(error);
        this.isFormLoading = false;
      }
    );
  }

  buildTagControls() {
    if(this.tags.length) {
      for(let tag of this.tags) {
        tag.selected = false;
        let tagControl = new FormControl(tag.selected);
        this.tagsControls.push(tagControl);
      }
    }
  }

  formatTodo(sourceTodo: ITodo) {
    this.todo._id = sourceTodo._id;
    this.todo.title = sourceTodo.title;
    this.todo.isCompleted = sourceTodo.isCompleted as boolean;
    this.todo.targetDate = this.formatTargetDate(sourceTodo.targetDate);
    this.todo.category = sourceTodo.category._id;
  }

  formatTargetDate(date: string): NgbDateStruct {
    let targetDate: Date = new Date(date);
    return {year: targetDate.getFullYear(), month: targetDate.getMonth()+1, day: targetDate.getDate()}
  }

  updateTagControls(sourceTags: ITag[]) {
    // these method is used to do checked or unchecked on tags
    if(sourceTags.length) {
      let tagIds = sourceTags.map(tag => tag._id);
      this.tags = this.tags.map(tag => {
        // this.tags means the list of tags received from the array
        if(tagIds.indexOf(tag._id) !== -1) {
          tag.selected = true;
        }
        return tag;
      });
    }

    let tagValues = this.tags.map(tag => tag.selected);
    this.todoForm.patchValue({tags: tagValues});
  }

  get title() {
    return this.todoForm.get('title');
  }

  get tagsControls() {
    return this.todoForm.get('tags') as FormArray;
  }

  get targetDate() {
    return this.todoForm.get('targetDate');
  }

  get category() {
    return this.todoForm.get('category');
  }

  formatPayload(payload:any) {
    let date = payload.targetDate;
    payload.targetDate = new Date(`${date.year}/${date.month}/${date.day}`);
    if(payload.tags.length) {
      payload.tags = payload.tags.map((value: string, index: string | number):any => {
        if(value) {
          return this.tags[<any>index]._id;
        }
      }).filter((value:any) => { 
        if(value) {
          return value;
        }
       });
    }
    return payload;
  }

  saveTodo() {
    if(this.todoForm.valid) {
      let payload = this.formatPayload(this.todoForm.value);
      if(this.isEdit) {
        payload.id = this.todo._id;
        this.todoService.updateTodo(payload)
            .subscribe(data => {
              this.router.navigate(['todos']);
            },
            (err: any) => {
              console.log(err);
              this.errorMessage = err.error.error || 'Failed to update Todo';
            });
      } else {
        this.todoService.saveTodo(payload)
        // payload is nothing but the form field values
            .subscribe((data) => {
              this.router.navigate(['todos']);
            },
            (err: any) => {
              this.errorMessage = err.error.error || 'Failed to add Todo';
            });
      }
    }
  }

  cancle(event:any) {
    // in case of cancle we will go to the todos list page
    event.preventDefault();
    this.router.navigate(['todos']);
  }

}
