import $ from 'jquery';

class MealDetailModal extends HTMLElement {

    connectedCallback() {
        this.render();
    }

    set meal(meal) {
        this._meal = meal;
        this.renderMealDetail();
    }

    eachObjectData(propertyName, i = 1, max = 20) {
        let temp = '';
        for (i; i <= max; i++) {
            let propVal = this._meal[propertyName + i];
            if (propVal != '' && propVal != null && propVal != ' ') {
                temp += '<td>' + propVal + '</td>';
            }
        }
        return temp;
    }

    render() {
        this.innerHTML = `
            <div class="modal fade" id="detailMealModal" tabindex="-1" aria-labelledby="detailMealModalLabel"
                aria-hidden="true">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title text-uppercase" id="detailMealModalLabel"></h5>
                            <button type="button" class="btn-close close-modal" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-outline-danger close-modal"
                                data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderMealDetail() {

        let params = new URL(this._meal.strYoutube).searchParams;
        let YTVideoID = params.get('v');

        $('.modal-title').html(this._meal.strMeal);
        $('.modal-body').html('');
        $('.modal-body').append(`
            <div class="row">
                <div class="col-12 col-md-12 col-lg-4 col-xl-4 my-sm-3 my-md-3">
                    <img src="${this._meal.strMealThumb}" class="card-img-top" style="width:100%; height:100%; transform: scaleZ(-1);" alt="${this._meal.strMealThumb} Thumb"/>
                </div>
                <div class="col-12 col-md-12 col-lg-8 col-xl-8">
                    <div class="ratio ratio-16x9">
                      <iframe src="https://www.youtube.com/embed/${YTVideoID}" title="${this._meal.strMeal} Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                </div>
            </div>
            <div class="my-4">
                <h4>Instructions</h3>
                <p class="justify-align-center">${this._meal.strInstructions}</p>
            
                <div class="overflow-auto my-2">
                <table class="table table-bordered text-center">
                    <tr>
                        <th class="bg-dark text-light">Ingredients</th>
                        ${this.eachObjectData("strIngredient") || "-"}
                    </tr>
                    <tr>
                        <th class="bg-dark text-light">Measures</th>
                        ${this.eachObjectData("strMeasure") || "-"}
                    </tr>
                </table>
                </div>
                <div class="overflow-auto my-2">
                <table class="table table-bordered text-center">
                    <tr class="bg-dark text-light">
                        <th>Area</th>
                        <th>Category</th>
                        <th>Tags</th>
                    </tr>
                    <tr>
                        <td>${this._meal.strArea || "-"}</td>
                        <td>${this._meal.strCategory || "-"}</td>
                        <td>${this._meal.strTags || "-"}</td>
                    </tr>
                </table>
                </div>
            </div>
        `);
    }
}

customElements.define('meal-detail-modal', MealDetailModal);