import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { People } from './people';
import { PeopleService } from './people.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public people: People[];
  public editPerson: People;
  public deletePerson: People;

  constructor(private peopleService: PeopleService) { }

  ngOnInit() {
    this.getPeople();
  }

  public getPeople(): void {
    this.peopleService.getPeople().subscribe(
      (response: People[]) => {
        this.people = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onAddPerson(addForm: NgForm): void {
    document.getElementById('add-person-form')?.click();
    this.peopleService.addPerson(addForm.value).subscribe(
      (response: People) => {
        console.log(response);
        this.getPeople();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdatePerson(person: People): void {
    this.peopleService.updatePerson(person).subscribe(
      (response: People) => {
        console.log(response);
        this.getPeople();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeletePerson(personId: number | undefined): void {
    if(personId != null)
    this.peopleService.deletePerson(personId).subscribe(
      (response: void) => {
        console.log(response);
        this.getPeople();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchPeople(key: string): void {
    console.log(key);
    const results: People[] = [];
    for (const person of this.people) {
      if (person._firstName.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || person._fullName.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || person._lastVibration.toDateString().indexOf(key.toLowerCase()) !== -1) {
        results.push(person);
      }
    }
    this.people = results;
    if (results.length === 0 || !key) {
      this.getPeople();
    }
  }

  public onOpenModal(person: People | null , mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addPersonModal');
    }
    if (mode === 'edit') {
      if(person!= null){
        this.editPerson = person;
        button.setAttribute('data-target', '#updatePersonModal');
      }
    }
    if (mode === 'delete') {
      if(person!= null)
      {
        this.deletePerson = person;
        button.setAttribute('data-target', '#deletePersonModal');
      }
    }
    
    container?.appendChild(button);
    button.click();
  }
}
