import { createSlice } from "@reduxjs/toolkit";

export const contentSlice = createSlice({
    name: 'content',
    initialState: {
        content: {
            'en-US': {
                searchText: "Filter your search by movie title, actor's name, genre, or year of release with ease, narrowing down your options to find exactly what you're looking for",
                sortText: "Sort films by rating, or release year, making it a breeze to find top-rated movies or iconic classic",
                titlePlaceholder: "Search movie title",
                actorSelectPlaceholder: "Select actors",
                actorSearchPlaceholder: "Search actors",
                genrePlaceholder: "Select genres",
                yearPlaceholder: "Select year",
                searchButtonText: "Search",
                actorsTooltipText: "'+(and)' - search for movies that include all selected actors, '-(or)' - search for movies that include at least one actor",
                genresTooltipText: "'+(and)' - search for movies that include all selected genres, '-(or)' - search for movies that include at least one genre",
                sortPlaceholder: "Select sort term",
                options: [
                    {name: 'Best match', term: 'Best match'},
                    {name: 'Vote ascending', term: 'Vote ascending'},
                    {name: 'Vote descending', term: 'Vote descending'},
                    {name: 'Year ascending', term: 'Year ascending'},
                    {name: 'Year descending', term: 'Year descending'}
                ],
                sortButtonText: "Sort",
                loadMore: "Load more..."
            },
            'uk': {
                searchText: "Відфільтруйте пошук за назвою фільму, іменем актора, жанром або роком випуску, звужуючи вибір, щоб знайти саме те, що ви шукаєте",
                sortText: "Відсортуйте фільми за рейтингом або роком випуску, щоб легко знаходити фільми з найвищим рейтингом або культову класику",
                titlePlaceholder: "Знайдіть назву фільму",
                actorSelectPlaceholder: "Оберіть акторів",
                actorSearchPlaceholder: "Знайдіть акторів",
                genrePlaceholder: "Оберіть жанри",
                yearPlaceholder: "Оберіть рік",
                searchButtonText: "Знайти",
                actorsTooltipText: "'+(і)' - шукати фільми з усіма обраними акторами, '-(або)' - шукати фільми з принаймні одним актором. Якщо не знаходить актора спробуйте знайти за англійським ім'ям (мову застосунка змінювати не треба)",
                genresTooltipText: "'+(і)' - шукати фільми, які включають усі вибрані жанри, '-(або)' - шукати фільми, які включають хоча б один жанр",
                sortPlaceholder: "Оберіть умову сортування",
                options: [
                    {name: 'Найкращій збіг', term: 'Best match'},
                    {name: 'Рейтинг за зростанням', term: 'Vote ascending'},
                    {name: 'Рейтинг за спаданням', term: 'Vote descending'},
                    {name: 'Рік за зростанням', term: 'Year ascending'},
                    {name: 'Рік за спаданням', term: 'Year descending'}
                ],
                sortButtonText: "Сортувати",
                loadMore: "Додати ще..."
            }
        }
    }
});

export const selectContent = (state) => state.content.content;

export default contentSlice.reducer;