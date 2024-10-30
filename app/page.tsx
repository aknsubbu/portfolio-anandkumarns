import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import ProjectCard from "@/components/ProjectCard";
import { projectConfig } from "@/config/projects";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";

export default function Home() {
  const featuredProjects = projectConfig
    .filter((project) => project.rank <= 2)
    .sort((a, b) => a.rank - b.rank);

  return (
    <>
      <Navbar /> {/* Add the Navbar component here */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Hi, I&apos;m Anandkumar NS...
          </h1>
          <h2 className="text-2xl md:text-4xl text-[#3D3D3D]">
            I&apos;m a{" "}
            <span className="text-[#FFFFFF]">
              student, a developer, a trader and a melophile{" "}
              <span className="text-sm md:text-lg font-extralight">
                (music lover)
              </span>
            </span>
          </h2>
        </div>
        <div className="mb-16">
          <div>
            <h1 className="font-extralight text-2xl md:text-3xl mb-4">
              Featured Projects
            </h1>
          </div>
          <div className="flex flex-col md:flex-row gap-5">
            {featuredProjects.map((project, index) => (
              <div key={index} className="w-full md:w-1/2 mb-5 md:mb-0">
                <ProjectCard
                  description={project.description}
                  image={project.image}
                  rank={project.rank}
                  title={project.title}
                  technologies={project.technologies}
                  github={project.github}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="mb-16">
          <Button as={Link} color="warning" href="/projects" underline="hover">
            See all projects
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
}
