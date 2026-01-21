export default function ResourceLinks() {
  return (
    <section className="flex flex-col mt-2 gap-2 md:flex-row md:gap-4 p-2">
      <div className="flex gap-4 justify-center md:justify-end items-center md:w-1/2 p-2">
        {" "}
        <a href="https://github.com/chingu-voyages/v59-tier2-team-23">
          Go to the project repo
        </a>
        <a href="https://github.com/chingu-voyages/v59-tier2-team-23">
          <img
            src={"/images/github-mark.png"}
            alt={"github"}
            className="w-6 h-6 rounded-full object-cover bg-white"
          />
        </a>
      </div>
      <div className="flex gap-4  justify-center md:justify-start items-center md:w-1/2 p-2">
        <a href="https://www.chingu.io/">Learn about Chingu</a>
        <a href="https://www.chingu.io/">
          <img
            src={"/images/Chingu.png"}
            alt={"github"}
            className="w-6 h-6 rounded-full object-cover"
          />
        </a>
      </div>
    </section>
  );
}
