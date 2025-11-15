const endpoints = [
  {
    method: "GET",
    path: "/api/jars",
    description: "Fetch all jars in the system",
    usage: `fetch("/api/jars")
      .then(res => res.json())
      .then(data => console.log(data));`,
    response: {
      message: "success",
      count: 1,
      jars: [
        {
          "id": 5476,
          "type": "release",
          "category": "vanilla",
          "name": "release - 1.21.10",
          "version": "1.21.10",
          "releaseTime": "2025-10-07T09:17:23.000Z",
          "javaVersion": "Java 21",
          "jar": "https://piston-data.mojang.com/v1/objects/95495a7f485eedd84ce928cef5e223b757d2f764/server.jar",
          "downloads": 0,
          "createdAt": "2025-11-13T22:21:58.942Z",
          "updatedAt": "2025-11-13T22:21:58.942Z"
        },
      ],
    },
    args: [
      {
        name: "category",
        type: "string",
        required: false,
        description: "Filters jars by category",
        example: "?category=forge",
      },
    ],
  },
];

function ArgumentsTable({ args }: any) {
  if (!args?.length) return null;

  return (
  <div className="w-full overflow-x-auto">
    <h2 className="text-lg font-semibold mb-2">Arguments</h2>
    <table className="w-full text-sm border border-borders mb-4 min-w-[600px]">
      <thead className="bg-background">
        <tr>
          <th className="p-2 text-left">Name</th>
          <th className="p-2 text-left">Type</th>
          <th className="p-2 text-left">Required</th>
          <th className="p-2 text-left">Description</th>
          <th className="p-2 text-left">Example</th>
        </tr>
      </thead>
      <tbody>
        {args.map((arg: any, i: any) => (
          <tr key={i} className="border-t bg-background/50">
            <td className="p-2 font-mono break-all">{arg.name}</td>
            <td className="p-2 break-all">{arg.type}</td>
            <td className="p-2">{arg.required ? "Yes" : "No"}</td>
            <td className="p-2 whitespace-pre-wrap break-words">{arg.description}</td>
            <td className="p-2 font-mono text-muted break-all">
              {arg.example || "-"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
}

function EndpointCard({ endpoint }: any) {
  return (
    <article className="rounded-lg shadow-xl p-6 bg-foreground text-white">
      <div className="flex items-center justify-between mb-2">
        <span className="px-2 py-1 rounded text-sm font-semibold bg-green-800">
          {endpoint.method}
        </span>
        <code className="font-mono text-xl">{endpoint.path}</code>
      </div>

      <p className="text-muted mb-4">{endpoint.description}</p>

      <ArgumentsTable args={endpoint.args} />

      <h2 className="text-lg font-semibold mb-2">Usage</h2>
      <pre className="bg-background p-4 rounded-md overflow-x-auto text-sm">
        {endpoint.usage}
      </pre>

      <h2 className="text-lg font-semibold mt-4 mb-2">Expected Response</h2>
      <pre className="bg-background p-4 rounded-md overflow-x-auto text-sm">
        {JSON.stringify(endpoint.response, null, 2)}
      </pre>
    </article>
  );
}

export default function ApiDocs() {
  return (
    <section className="container mx-auto px-4 md:px-0">
      <h1 className="text-3xl font-bold mb-6 text-center">API Documentation</h1>
      <div className="flex flex-col space-y-6">
        {endpoints.map((endpoint, idx) => (
          <EndpointCard key={idx} endpoint={endpoint} />
        ))}
      </div>
    </section>
  );
}