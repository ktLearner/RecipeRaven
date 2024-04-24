import { useEffect, useId, useRef, useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";

function IngredientField(props) {
  const id = useId();

  return <div className="flex gap-2">
    <input name={"ingredient-name" + id} id={"ingredient-name" + id} className="input grow" placeholder="Ingredient" />
    <input name={"ingredient-amt" + id} id={"ingredient-amt" + id} className="input" placeholder="Amount" />
    <button onClick={props.onDelete} className="btn btn-error" type="button"><FaTrash className="text-error-content" /></button>
  </div>;
}

function TagField(props) {
  const [text, setText] = useState("");
  const thisRef = useRef();
  const id = useId();

  useEffect(() => thisRef.current.focus?.(), []);

  function handleBlur() {
    if (!text.length) props.onDelete();
  }

  function handleChange(e) {
    setText(e.target.innerText);
  }

  return <span className="p-2 w-min flex rounded-box bg-accent">
    <input type="hidden" value={thisRef.current?.innerText} name={"tag" + id} id={"tag" + id} />
    <span ref={thisRef} onBlur={handleBlur} onInput={handleChange} contentEditable="true" className="p-2 min-w-[2ch] focus:outline-none text-accent-content text-nowrap"></span>
    <span className="p-2 text-accent-content cursor-pointer" onClick={props.onDelete}>&#x2715;</span>
  </span>
}

function AllergenField(props) {
  const [text, setText] = useState("");
  const thisRef = useRef();
  const id = useId();

  useEffect(() => thisRef.current.focus?.(), []);

  function handleBlur() {
    if (!text.length) props.onDelete();
  }

  function handleChange(e) {
    setText(e.target.innerText);
  }

  return <span className="p-2 w-min flex rounded-box bg-primary">
    <input type="hidden" name={"allergen" + id} id={"allergen" + id} value={thisRef.current?.innerText} />
    <span ref={thisRef} onBlur={handleBlur} onInput={handleChange} contentEditable="true" className="p-2 min-w-[2ch] focus:outline-none text-primary-content text-nowrap"></span>
    <span className="p-2 text-accent-content cursor-pointer" onClick={props.onDelete}>&#x2715;</span>
  </span>
}

export default function MetaData(props) {
  const previewRef = useRef();

  const [ingredients, setIngredients] = useState([]);
  const [tags, setTags] = useState([]);
  const [allergens, setAllergens] = useState([]);

  useEffect(() => {
    props.isIngredientsEmpty(!ingredients.length);
  }, [ingredients]);

  function uploadImage(e) {
    const file = e.target.files[0];
    const reader = new FileReader;
    reader.readAsDataURL(file);
    reader.onload = () => previewRef.current.src = reader.result;
  }

  function addIngredient() {
    const idx = ingredients.length;

    function onDelete(i) {
      return () => setIngredients(ing => ing.filter(ing => ing.idx !== i));
    }

    setIngredients(ing => [...ing, { idx, onDelete: onDelete(idx) }]);
  }

  function addTag() {
    const idx = tags.length;

    function onDelete(i) {
      return () => setTags(tag => tag.filter(tag => tag.idx !== i));
    }

    setTags(tag => [...tag, { idx, onDelete: onDelete(idx) }]);
  }

  function addAllergen() {
    const idx = allergens.length;

    function onDelete(i) {
      return () => setAllergens(allergen => allergen.filter(allergen => allergen.idx !== i));
    }

    setAllergens(allergen => [...allergen, { idx, onDelete: onDelete(idx) }]);
  }

  return <div className="flex flex-col gap-2">
    <h2 className="divider divider-start">About the recipe</h2>
    <input required className="input" placeholder="Title" name={"name"} id={"name"} />

    <div className="flex gap-2">
      <textarea name={"description"} id={"description"} required className="grow input h-36 sm:h-52 resize-none" placeholder="Description" />
      <div className="size-36 sm:size-52 rounded-box overflow-hidden">
        <label htmlFor="recipe-image">
          <img ref={previewRef} className="size-full cursor-pointer" src="https://placehold.co/400/223659/FFFFFF/png?font=roboto&text=Add++recipe+image" alt="Add image" />
        </label>
        <input onChange={uploadImage} className="hidden" accept="image/*" type="file" name="recipe-image" id="recipe-image" />
      </div>
    </div>

    <input required name={"cuisine"} id={"cuisine"} className="input" placeholder="Cuisine" />
    <input required name={"calories"} id={"calories"} className="input" placeholder="Calories" />
    <label>Ingredients</label>
    {ingredients.length ? ingredients.map(ing => <IngredientField key={ing.idx} {...ing} />) : <span className="p-4 text-warning">No ingredients added! (add atleast 1)</span>}
    <button onClick={addIngredient} className="btn btn-neutral self-start btn-primary" type="button">Add ingredient <FaPlus /></button>
    <label>Tags</label>
    <div className="flex gap-2 items-center">
      {tags.length ? tags.map(tag => <TagField key={tag.idx} {...tag} />) : <span className="p-4">(No tags)</span>}
      <button onClick={addTag} className="btn rounded-[100%] btn-neutral" type="button"><FaPlus /></button>
    </div>
    <label>Allergens</label>
    <div className="flex gap-2 items-center">
      {allergens.length ? allergens.map(allergen => <AllergenField key={allergen.idx} {...allergen} />) : <span className="p-4">(No Allergens added)</span>}
      <button onClick={addAllergen} className="btn rounded-[100%] btn-neutral" type="button"><FaPlus /></button>
    </div>
  </div>
}