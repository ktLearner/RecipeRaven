function RecipeTag(props) {
  return <span className="badge badge-primary">{props.text}</span>
}

function RecipeAllergen(props) {
  return <span className="badge badge-secondary">{props.text}</span>
}

export default function RecipeCard(props) {
  return <div className="p-8 rounded-box bg-base-300 flex flex-col gap-2">
    <img src={`data:image/jpeg;base64${props.imageUrl.toString("base64")}`} />
    <h1 className="text-xl font-bold text-primary">{props.title}</h1>
    <span>Cuisine : {props.cuisine}</span>
    <span className="flex gap-1 items-center">Tags : {props.tags.length && props.tags.map((tag, i) => <RecipeTag key={i} text={tag} />)}</span>
    <span className="flex gap-1 items-center">Allergens : {props.allergens.length && props.allergens.map((allergen, i) => <RecipeAllergen key={i} text={allergen} />)}</span>
    <span className="pt-2">{props.description}</span>
    <span className="">Created by : {props.createdBy.name}</span>
  </div>
}