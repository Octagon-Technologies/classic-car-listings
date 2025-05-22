

function SortTags() {
    return (
      <div className="sort-bar">
        <p className="title" style={{ fontWeight: "700" }}>
          Sort:
        </p>

        <p id="priceTab" className="tab">By Price</p>
        <p id="timeCreatedTab" className="tab">By Date Posted</p>
      </div>
    );
}

export default SortTags