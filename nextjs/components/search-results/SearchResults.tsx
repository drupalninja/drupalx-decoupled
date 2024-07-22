import React from 'react';
import './SearchResults.scss';

interface SearchResultsItemProps {
  title: string;
  image: string;
  summary: string;
  link: string;
}

const SearchResultsItem: React.FC<SearchResultsItemProps> = ({ title, image, summary, link }) => {
  return (
    <div className="row mb-2">
      <div>{link}</div>
      <h2><a href={link} className="text-secondary">{title}</a></h2>
      <div dangerouslySetInnerHTML={{ __html: summary }} />
    </div>
  );
};

interface SearchResultsProps {
  results: SearchResultsItemProps[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  return (
    <div className="container">
      {results.map((item, index) => (
        <SearchResultsItem
          key={index}
          title={item.title}
          image={item.image}
          summary={item.summary}
          link={item.link}
        />
      ))}
    </div>
  );
};

export default SearchResults;
