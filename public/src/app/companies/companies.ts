import {Component, View} from "angular2/core";
import {Http, Request, RequestMethod, Headers, HTTP_PROVIDERS} from "angular2/http";
import {Router} from "angular2/router";
import {AuthManager} from "../authmanager";
import {ICompany} from "../interfaces";
import {Utility} from "../utility";

@Component({
    selector: "companies",
    viewProviders: [HTTP_PROVIDERS, AuthManager, Utility]
})

@View({
    templateUrl: "app/companies/companies.html"
})

export class CompaniesPage {

    http: Http;
    companies: Array<ICompany>;
    utility: Utility;

    constructor(http: Http, router: Router, authManager: AuthManager, utility: Utility) {
        if (!authManager.isAuthenticated()) {
            router.navigate(["Auth"]);
        }
        this.http = http;
        this.utility = utility;
        this.companies = [];
        this.utility.makeGetRequest("/api/company/getAll", []).then((result) => {
            this.companies = <Array<ICompany>> result;
        }, (error) => {
            console.error(error);
        });
    }

    create(name: string, street: string, city: string, state: string, zip: string, country: string, phone: string, website: string) {
        /*var postBody: ICompany = {
            name: name,
            address: {
                street: street,
                city: city,
                state: state,
                country: country,
                zip: zip
            },
            phone: phone,
            website: website
        }
        var requestHeaders = new Headers();
        requestHeaders.append("Content-Type", "application/json");
        this.http.request(new Request({
            method: RequestMethod.Post,
            url: "/api/company/create",
            body: JSON.stringify(postBody),
            headers: requestHeaders
        }))
        .subscribe((success) => {
            postBody.id = success.json()._id;
            this.companies.push(postBody);
        }, (error) => {
            console.error("ERROR -> " + JSON.stringify(error));
        });*/
        this.utility.makePostRequest("/api/company/create", [], {
            name: name,
            address: {
                street: street,
                city: city,
                state: state,
                country: country,
                zip: zip
            },
            phone: phone,
            website: website
        }).then((result) => {
            this.companies.push(<ICompany> result);
        }, (error) => {
            console.error(error);
        });
    }
}
