import {
    Component,
    OnInit,
    OnChanges,
    SimpleChanges,
    Input,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { AuthService } from "src/app/auth/services/auth.service";
import Swal from "sweetalert2";

@Component({
    selector: "ml-menu",
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule],
    templateUrl: "./menu.component.html",
    styleUrls: ["./menu.component.scss"],
})
export class MenuComponent implements OnInit, OnChanges {
    loggedIn!: boolean;
    filterSearch = "";
    @Input() comicId!: boolean;

    userId: string = localStorage.getItem("user-id") || "";

    constructor(
        private readonly authService: AuthService,
        private readonly router: Router
    ) {}

    ngOnInit(): void {
        this.authService.isLogged();
        this.authService.loginChange$.subscribe((t) => (this.loggedIn = t));

        console.log(this.userId);
    }
    ngOnChanges(changes: SimpleChanges): void {
        if (changes) {
            // Realizar acciones basadas en el nuevo valor de myValue
            console.log("El nuevo valor de myValue es:", changes);
            this.authService.isLogged();
            this.authService.loginChange$.subscribe((t) => (this.loggedIn = t));
        }
    }

    logout(): void {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "¡Si cierra la sesión, ya no podrá leer ningún comic!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, cerrar sesión!",
        }).then((result) => {
            if (result.isConfirmed) {
                this.authService.logout();
                Swal.fire("¡Ya no está conectado!");
            }
        });
    }

    busqueda() {
        this.router.navigate([""], {
            queryParams: { search: this.filterSearch },
        });
    }
    busquedaFiltro(genero){
      this.router.navigate(["/categorias"], {
        queryParams: { filtro: genero },
    });
    }
}
