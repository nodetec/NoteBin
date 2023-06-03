const projects = [
  { name: "Graph API", href: "#", description: "All about graph APIs" },
  { name: "Component Design", href: "#", description: "All about component design" },
  { name: "Templates", href: "#", description: "All about templates" },
  { name: "React Components", href: "#", description: "All about React components" },
];

export default function RecentNotes() {
  return (
    <div className="mb-10">
      <ul role="list" className="mt-3 hidden grid-cols-1 lg:grid lg:grid-cols-4 lg:gap-3">
        {projects.map((project) => (
          <li key={project.name} className="col-span-1 flex rounded-md border shadow-md dark:border-smoke-600">
            <a href={project.href} className="font-medium text-gray-900 hover:text-gray-600 dark:text-blue-500">
              <div className="flex flex-1 items-center justify-between truncate">
                <div className="flex-1 truncate px-4 py-2 text-sm">
                  {project.name}
                  <p className="text-gray-500">{project.description}</p>
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
