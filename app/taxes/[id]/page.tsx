'use client';

import { useState } from "react";

export default function TaxesId() {
  const [search, setSearch] = useState<string | null>(null);
  const [results, setResults] = useState<Array<any>>([]);
  const [loading, setLoading] = useState<boolean>(true);

  return <main></main>;
}
